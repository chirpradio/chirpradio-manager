# do_periodic_import.py
# empty_dropbox.py

import codecs
import logging
import os
import shutil

from flask.ext.restful import Resource
from flask import current_app as app

from chirp.common import conf
from chirp.common.conf import (LIBRARY_PREFIX, LIBRARY_DB, LIBRARY_TMP_PREFIX)
from chirp.common import timestamp

from chirp.library import album
from chirp.library import analyzer
from chirp.library import artists
from chirp.library import audio_file
from chirp.library import database
from chirp.library import dropbox
from chirp.library import import_file
from chirp.library import import_transaction

import update_git

VOLUME_NUMBER = 1
IMPORT_SIZE_LIMIT = 0.95 * (3 << 30) # 95% of 3GB.

class ImportAlbums(Resource):

    def import_albums(self, inbox):
        # do_periodic_import.py
        prescan_timestamp = timestamp.now()
        error_count = 0
        album_count = 0
        seen_fp = {}
        albums = []
        db = database.Database(LIBRARY_DB)

        try:
            for i, alb in enumerate(inbox.albums()):
                try:
                    #TODO handle excections so that error albums don't silently disapper
                    albm = {'album_id': i+1, 'tracks': [], 'messages': []}
                    alb.drop_payloads()
                    albm['title'] = alb.title()
                    albm['artist'] = alb.all_artist_names() if alb.is_compilation() else alb.artist_name()
                    album_count += 1

                    logging.info("#%d" % album_count)
                    logging.info((u'"%s"' % alb.title()).encode('utf-8'))
                    if alb.tags():
                        logging.info("(%s)" % ", ".join(alb.tags()))
                    else:
                        logging.info('\n')
                    duration_ms = sum(au.duration_ms for au in alb.all_au_files)
                    if alb.is_compilation():
                        logging.info("Compilation")
                        for i, au in enumerate(alb.all_au_files):
                            logging.info(" %02d:" % (i+1,)+unicode(au.mutagen_id3["TPE1"]).encode("utf-8"))
                    else:
                        logging.info(alb.artist_name().encode("utf-8"))
                    logging.info("%d tracks / %d minutes" % (len(alb.all_au_files), int(duration_ms / 60000)))
                    logging.info("ID=%015x" % alb.album_id)

                    # Check that the album isn't already in library.
                    collision = False
                    for au in alb.all_au_files:
                        # create track
                        track = {}
                        track['path'] = au.path
                        try:
                            track['number'] = au.mutagen_id3['TRCK'].text[0].split('/')[0]
                            track['title'] = au.tit2()
                            track['artist'] = au.tpe1()
                            track['album_id'] = albm['album_id']
                        except Exception, e:
                            logging.exception(e)
                            albm['messages'].append({'message': "error reading dropbox", 'status': 'error'})
                            albm['status'] = "error"
                            error_count += 1
                        album_path = au.path
                        albm['path'] = '/'.join(album_path.split('/')[:-1])

                        if au.fingerprint in seen_fp:
                            message = ("***** ERROR: DUPLICATE TRACK WITHIN IMPORT\n"
                                      ("This one is at %s\n" % au.path)
                                      ("Other one is at %s" % seen_fp[au.fingerprint].path))
                            logging.error(message)
                            collision = True
                            # break
                        fp_au_file = db.get_by_fingerprint(au.fingerprint)
                        if fp_au_file is not None:
                            message = ("****** ERROR: TRACK ALREADY IN LIBRARY\n"+
                                       unicode(fp_au_file.mutagen_id3).encode("utf-8"))
                            logging.error(message)
                            collision = True
                            # break
                        seen_fp[au.fingerprint] = au

                        albm['tracks'].append(track)

                    if collision:
                        error_count += 1
                        albm['messages'].append({'message': 'Tracks already in library', 'status': 'error'})
                        albm['status'] = 'error'

                    # Attach a dummy volume # and timestamp
                    alb.set_volume_and_import_timestamp(0xff, prescan_timestamp)
                    try:
                        alb.standardize()
                        logging.info("OK!")
                    except (import_file.ImportFileError, album.AlbumError), ex:
                        message = ("***** IMPORT ERROR"
                                   "***** %s\n" % str(ex))
                        logging.error(message)
                        albm['messages'].append({'message': message, 'status': 'error'})
                        albm['status'] = 'error'
                        error_count += 1

                    albums.append(albm)
                except Exception, e:
                    error_count += 1
                    logging.exception(e)

        except analyzer.InvalidFileError, ex:
            message = ("***** INVALID FILE ERROR"
                       "***** %s\n" % str(ex))
            logging.error(message)
            error_count += 1

        logging.info("-" * 40)
        logging.info("Found %d albums" % album_count)

        # sort albums by title, then artist
        albums = sorted(albums, key=lambda album: album.get('title'))
        albums = sorted(albums, key=lambda album: album.get('artist'))

        # if in development do not commit to database
        if app.config['DEV']:
            return {'albums': albums}

        # if errors, do not commit to database
        if error_count > 0:
            logging.error("Saw %d errors" % error_count)
            return {'albums': albums}
        else:
            txn = None
            for alb in inbox.albums():
                if txn is None:
                    txn = import_transaction.ImportTransaction(db, VOLUME_NUMBER,
                                                               timestamp.now(),
                                                               LIBRARY_TMP_PREFIX,
                                                               dry_run=False)
                txn.add_album(alb)
                # If the transaction has grown too large, commit it.
                if txn.total_size_in_bytes > IMPORT_SIZE_LIMIT:
                    txn.commit(LIBRARY_PREFIX)
                    txn = None
            # Flush out any remaining tracks.
            if txn:
                txn.commit(LIBRARY_PREFIX)

            # empty_dropbox.py
            for dir in os.listdir(conf.MUSIC_DROPBOX):

                if dir.startswith('.'):
                    continue
                fn = os.path.join(conf.MUSIC_DROPBOX, dir)
                if not os.path.isdir(fn):
                    continue
                shutil.rmtree(fn)

            return {'albums': albums}

    def get(self, dropbox_path=None):
        # do_dump_new_artists_in_dropbox --rewrite
        drop = dropbox.Dropbox(dropbox_path=dropbox_path)
        new_artists = set()
        for au_file in drop.tracks():
            try:
                tpe1 = au_file.mutagen_id3["TPE1"].text[0]
                if artists.standardize(tpe1) is None:
                    new_artists.add(tpe1)
            except Exception, e:
                logging.exception(e)
                raise
        to_print = list(new_artists)
        to_print.extend(artists.all())
        to_print.sort(key=artists.sort_key)
        print app.config['DEV']
        if not app.config['DEV']:
            output = codecs.open(artists._WHITELIST_FILE, "w", "utf-8")
            print artists._WHITELIST_FILE
            raw_input()
            for tpe1 in to_print:
                output.write(tpe1)
                output.write("\n")

            if new_artists:
                #update_git.update()
                logging.info('Artists whitelist pushed to Github')

        # reload artists module to repopulate global artists whitelist cache
        reload(artists)

        #inbox = dropbox.Dropbox()
        return self.import_albums(drop)
