import datetime
import re
import sys
import time
import urllib2

import base64

# import first to load gae-sdk env
from chirp.common import chirpradio

from flask.ext.restful import Resource, abort
from google.appengine.ext import db

from chirp.common import conf
from chirp.common import timestamp
from chirp.library import album
from chirp.library import artists
from chirp.library import constants
from chirp.library import database
from chirp.library import order
from chirp.library import titles
from djdb import models
from djdb import search

import current_route
from messages import Messages
from do_periodic_import import ImportTimeStamp



_artist_cache = {}

from flask import request

class Push(Resource):

    def do_push_artists(self):
        # patch credentials
        if not request.headers.get('Authorization'):
            abort(401)
        else:
            auth = request.headers['Authorization'].lstrip('Basic ')
            username, password = base64.b64decode(auth).split(':')
            if username and password:
                conf.CHIRPRADIO_AUTH = '%s %s' % (username, password)
                chirpradio.connect()
            else:
                abort(401)

        dry_run = False

        # reload artists from file
        artists._init()

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
                #print "Mapping %d: %s => %s" % (mapped, art.name, std_name)
                mapped += 1
                art.name = std_name
                idx = search.Indexer()
                idx._transaction = art.parent_key()
                idx.add_artist(art)
                if not dry_run:
                    idx.save()
            all_chirpradio_artists.add(art.name)

        to_push = list(all_library_artists.difference(all_chirpradio_artists))

        Messages.add_message("Pushing %d artists" % len(to_push), 'warning')
        while to_push:
            # Push the artists in batches of 50
            this_push = to_push[:50]
            to_push = to_push[50:]
            idx = search.Indexer()
            for name in this_push:
                #print name
                art = models.Artist.create(parent=idx.transaction, name=name)
                idx.add_artist(art)
            if not dry_run:
                idx.save()
            #print "+++++ Indexer saved"

        Messages.add_message("Artist push complete. OK!", 'success')


    def do_push(self):

        # IMPORT_TIME_STAMP from import step        
        START_TIMESTAMP = ImportTimeStamp.import_time_stamp
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
                        raise UnknownArtistError("Unknown artist: %s" % name)
                    _artist_cache[name] = art
                    return art
                except urllib2.URLError:
                    #print "Retrying fetch_by_name for '%s'" % name
                    pass

        def seen_album(album_id):
            while True:
                try:
                    for alb in models.Album.all().filter("album_id =", album_id):
                        if not alb.revoked:
                            return True
                    return False
                except urllib2.URLError:
                    #print "Retrying fetch of album_id=%s" % album_id
                    pass

        def process_one_album(idx, alb):
            # Build up an Album entity.
            kwargs = {}
            kwargs["parent"] = idx.transaction
            kwargs["title"] = alb.title()
            kwargs["album_id"] = alb.album_id
            kwargs["import_timestamp"] = datetime.datetime.utcfromtimestamp(
                alb.import_timestamp())
            kwargs["num_tracks"] = len(alb.all_au_files)
            kwargs["import_tags"] = alb.tags()

            if alb.is_compilation():
                kwargs["is_compilation"] = True
            else:
                kwargs["is_compilation"] = False
                kwargs["album_artist"] = get_artist_by_name(alb.artist_name())

            #for key, val in sorted(kwargs.iteritems()):
                #print "%s: %s" % (key, val)
            if seen_album(alb.album_id):
                #print "   Skipping"
                return

            album = models.Album(**kwargs)

            # Look for a disc number in the tags.
            for tag in kwargs["import_tags"]:
                m = _DISC_NUM_RE.search(tag)
                if m:
                    album.disc_number = int(m.group(1))
                    break

            idx.add_album(album)

            for au_file in alb.all_au_files:
                track_title, import_tags = titles.split_tags(au_file.tit2())
                track_num, _ = order.decode(unicode(au_file.mutagen_id3["TRCK"]))
                kwargs = {}
                if alb.is_compilation():
                    kwargs["track_artist"] = get_artist_by_name(au_file.tpe1()) 
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
            idx = search.Indexer()
            for alb in list_of_pending_albums:
                process_one_album(idx, alb)
            # This runs as a batch job, so set a very long deadline.
            while True:
                try:
                    rpc = db.create_rpc(deadline=120)
                    idx.save(rpc=rpc)
                    return
                except urllib2.URLError:
                    #print "Retrying indexer flush"
                    pass


        def maybe_flush(list_of_pending_albums):
            if len(list_of_pending_albums) < _NUM_ALBUMS_PER_FLUSH:
                return list_of_pending_albums
            flush(list_of_pending_albums)
            return []

        # main

        #chirpradio.connect("10.0.1.98:8000")
        chirpradio.connect()
        
        Messages.add_message('Beginning to push albums.', 'warning')

        sql_db = database.Database(conf.LIBRARY_DB)
        pending_albums = []
        this_album = []
        # TODO(trow): Select the albums to import in a saner way.
        for vol, import_timestamp in sql_db.get_all_imports():
            if START_TIMESTAMP is not None and import_timestamp < START_TIMESTAMP:
                continue
            #print "***"
            #print "*** import_timestamp = %s" % timestamp.get_human_readable(
                import_timestamp)
            #print "***"
            for au_file in sql_db.get_by_import(vol, import_timestamp):
                if this_album and this_album[0].album_id != au_file.album_id:
                    alb = album.Album(this_album)
                    pending_albums.append(alb)
                    Messages.add_message('Adding "%s"' % alb.title(), 'success')
                    pending_albums = maybe_flush(pending_albums)
                    this_album = []
                this_album.append(au_file)
            
        # Add the last album to the list of pending albums, then do the
        # final flush.
        if this_album:
            alb = album.Album(this_album)
            Messages.add_message('Adding "%s"' % alb.title(), 'success')
            pending_albums.append(alb)
            this_album = []
        flush(pending_albums)
        
        Messages.add_message('Album push complete. OK!', 'success')
        Messages.add_message('Import process complete. OK!', 'success')

        current_route.CURRENT_ROUTE = 'import'
        
    def get(self):
        self.do_push_artists()
        self.do_push()
