import datetime
import logging
import re
import sys
import time
import urllib2

from flask.ext.restful import Resource
from flask import current_app as app

from chirp.common import chirpradio
from chirp.common import conf
from chirp.common import timestamp
from chirp.library import album
from chirp.library import artists
from chirp.library import database
from chirp.library import order
from chirp.library import titles
from djdb import models
from djdb import search

from google.appengine.ext import db


_artist_cache = {}

class PushToCloud(Resource):
    
    def get(self):
        messages = []
        chirpradio.connect()

        # do_push_artists_to_chirpradio.py
        
        # Find all of the library artists
        all_library_artists = set(artists.all())
        
        # Find all of the artists in the cloud.
        all_chirpradio_artists = set()
        mapped = 0
        t1 = time.time()
        for art in models.Artist.fetch_all():
            if art.revoked:
                continue
            std_name = artists.standardize(art.name)
            if std_name != art.name:
                logging.info("Mapping %d: %s => %s" % (mapped, art.name, std_name))
                mapped += 1
                art.name = std_name
                idx = search.Indexer()
                idx._transaction = art.parent_key()
                idx.add_artist(art)
                if not app.config['DEV']:
                    idx.save()
            all_chirpradio_artists.add(art.name)
        
        to_push = list(all_library_artists.difference(all_chirpradio_artists))
        message =  "Pushing %d artists" % len(to_push)
        messages.append({'message': message, 'status': 'success'})
        while to_push:
            # Push the artists in batches of 50
            this_push = to_push[:50]
            to_push = to_push[50:]
            idx = search.Indexer()
            for name in this_push:
                logging.info(name)
                art = models.Artist.create(parent=idx.transaction, name=name)
                idx.add_artist(art)
            if not app.config['DEV']:
                idx.save()
            logging.info("+++++ Indexer saved")

        # do_push_to_chirpradio.py

        # TODO assumes only one import per day
        START_TIME = datetime.datetime.now().strftime("%Y%m%d")+'-000000'
        START_TIMESTAMP = timestamp.parse_human_readable(START_TIME)

        # TODO(trow): Is this optimal?
        _NUM_ALBUMS_PER_FLUSH = 3

        _DISC_NUM_RE = re.compile("disc\s+(\d+)", re.IGNORECASE)


        class UnknownArtistError(Exception):
            pass


        def get_artist_by_name(name):
            global _artist_cache
            if name in _artist_cache:
                return _artist_cache[name]
            while True:
                try:
                    art = models.Artist.fetch_by_name(name)
                    if art is None:
                        raise UnknownArtistError("Unknow artist: %s" % name)
                    _artist_cache[name] = art
                    return art
                except urllib2.URLError:
                    logging.info("Retrying fetch_by_name for '%s'" % name)


        def seen_album(album_id):
            while True:
                try:
                    for alb in models.Album.all().filter('album_id =', album_id):
                        if not alb.revoked:
                            return True
                    return False
                except urllib2.URLError:
                    logging.info("Retrying fetch of album_id=%s" % album_id)

        def process_one_album(idx, alb):
            # Build up an Album entity
            kwargs = {}
            kwargs['parent'] = idx.transaction
            kwargs['title'] = alb.title()
            kwargs['album_id'] = alb.album_id
            kwargs['import_timestamp'] = datetime.datetime.utcfromtimestamp(
                alb.import_timestamp())
            kwargs['num_tracks'] = len(alb.all_au_files)
            kwargs['import_tags'] = alb.tags()

            if alb.is_compilation():
                kwargs['is_compilation'] = True
            else:
                kwargs['is_compilation'] = False
                kwargs['album_artist'] = get_artist_by_name(alb.artist_name())

            for key, val in sorted(kwargs.iteritems()):
                logging.info("%s: %s\n" % (key, val))
            if seen_album(alb.album_id):
                logging.info("    Skipping")
                return

            album = models.Album(**kwargs)

            # Look for a disc number in the tags
            for tag in kwargs['import_tags']:
                m = _DISC_NUM_RE.search(tag)
                if m:
                    album.disc_number = int(m.group(1))
                    break

            idx.add_album(album)

            for au_file in alb.all_au_files:
                track_title, import_tags = titles.split_tags(au_file.tit2())
                track_num, _ = order.decode(unicode(au_file.mutagen_id3['TRCK']))
                kwargs = {}
                if alb.is_compilation():
                    kwargs['track_artist'] = get_artist_by_name(au_file.tpe1())
                track = models.Track(
                    parent=idx.transaction,
                    ufid=au_file.ufid(),
                    album=album,
                    title=track_title,
                    import_tags=import_tags,
                    track_num=track_num,
                    sampling_rate_hz=au_file.mp3_header.sampling_rate_hz,
                    bit_rate_kbps=int(au_file.mp3_header.bit_rate_kbps),
                    channels=au_file.mp3_header.channels_str,
                    duration_ms=au_file.duration_ms,
                    **kwargs)
                idx.add_track(track)


        def flush(list_of_pending_albums):
            if not list_of_pending_albums:
                return
            if app.config['DEV']: # DRY_RUN
                return
            idx = search.Indexer()
            for alb in list_of_pending_albums:
                process_one_album(idx, alb)
            # This runs as a batch job, so set a very long deadline
            while True:
                try:
                    rpc = db.create_rpc(deadline=120)
                    idx.save(rpc=rpc)
                    return
                except urllib2.URLError:
                    logging.info("Retrying indexer flush")


        def maybe_flush(list_of_pending_albums):
            if len(list_of_pending_albums) < _NUM_ALBUMS_PER_FLUSH:
                return list_of_pending_albums
            flush(list_of_pending_albums)
            return []

        # main
        sql_db = database.Database(conf.LIBRARY_DB)
        pending_albums = []
        this_album = []
        # TODO(trow): Select the albums to import in a saner way.
        for vol, import_timestamp in sql_db.get_all_imports():
            print import_timestamp
            if START_TIMESTAMP is not None and import_timestamp < START_TIMESTAMP:
                continue
            logging.info("***\n")
            logging.info("*** import_timestamp = %s\n" % timestamp.get_human_readable(
                import_timestamp))
            logging.info("***")
            for au_file in sql_db.get_by_import(vol, import_timestamp):
                if this_album and this_album[0].album_id != au_file.album_id:
                    alb = album.Album(this_album)
                    pending_albums.append(alb)
                    message = 'Adding "%s"\n' % alb.title()
                    messages.append({'message': message, 'status': 'success'})
                    message = ''
                    logging.info(message)
                    pending_albums = maybe_flush(pending_albums)
                    this_album = []
                this_album.append(au_file)


        # Add the last album to the list of pending albums, then do the
        # final flush
        if this_album:
            alb = album.Album(this_album)
            message = 'Adding "%s"' % alb.title()
            logging.info(message)
            messages.append({'message': message, 'status': 'success'})
            pending_albums.append(alb)
            this_album = []
        flush(pending_albums)

        return {'messages': messages}
