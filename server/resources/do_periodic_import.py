import codecs
import os
import shutil

from flask.ext.restful import Resource

from chirp.common import timestamp
from chirp.common.conf import (LIBRARY_PREFIX, LIBRARY_DB,
                                   LIBRARY_TMP_PREFIX, MUSIC_DROPBOX)
from chirp.library import album
from chirp.library import analyzer
from chirp.library import artists
from chirp.library import audio_file
from chirp.library import database
from chirp.library import dropbox
from chirp.library import import_file
from chirp.library import import_transaction

import current_route
from messages import Messages
from pre_import_dropbox_scan import album_to_json

VOLUME_NUMBER = 1
IMPORT_SIZE_LIMIT = 0.95 * (3 << 30)  # 95% of 3GB.
IMPORT_TIME_STAMP = None

class ImportAlbums(Resource):

    def import_albums(self, inbox):
        prescan_timestamp = timestamp.now()
        IMPORT_TIME_STAMP = timestamp.now()
        error_count = 0
        album_count = 0
        seen_fp = {}
        albums = []

        db = database.Database(LIBRARY_DB)
        try:
            for alb in inbox.albums():

                # generate response)
                album_path = os.path.dirname(alb.all_au_files[0].path)
                album_response = album_to_json(alb, album_path)
                
                # initialize error state
                # import porcess will halt if an error is seen
                album_error = False
               
                alb.drop_payloads()
                album_count += 1

                # start album_message
                album_message = u'"%s"<br>' % alb.title().encode("utf-8")
                if alb.tags():
                    album_message += "(%s)" % ", ".join(alb.tags())
                duration_ms = sum(au.duration_ms for au in alb.all_au_files)
                if alb.is_compilation():
                    album_message += "Compilation<br>"
                    for i, au in enumerate(alb.all_au_files):
                        album_message += "  %02d:" % (i+1,)
                        album_message +=  unicode(au.mutagen_id3["TPE1"]).encode("utf-8")
                else:
                    album_message += alb.artist_name()#.encode("utf-8") #TODO
                album_message += "<br>%d tracks / %d minutes<br>" % (
                    len(alb.all_au_files), int(duration_ms / 60000))
                album_message += "ID=%015x<br>" % alb.album_id

                # Check that the album isn't already in library.
                collision = False
                for au in alb.all_au_files:
                    if au.fingerprint in seen_fp:
                        album_message += "<br>***** ERROR: DUPLICATE TRACK WITHIN IMPORT<br>"
                        #album_message +=  "<br>This one is at: %s<br>" % au.path
                        #album_message +=  "<br>Other one is at: %s<br>" % seen_fp[au.fingerprint].path
                        collision = True
                        break
                    fp_au_file = db.get_by_fingerprint(au.fingerprint)
                    if fp_au_file is not None:
                        album_message += "<br>***** ERROR: TRACK ALREADY IN LIBRARY"
                        #album_message += unicode(fp_au_file.mutagen_id3).encode("utf-8")
                        collision = True
                        break
                    seen_fp[au.fingerprint] = au

                if collision:
                    album_error = True
                    error_count += 1

                # Attach a dummy volume # and timestamp
                alb.set_volume_and_import_timestamp(0xff, prescan_timestamp)
                try:
                    alb.standardize()
                except (import_file.ImportFileError, album.AlbumError), ex:
                    album_message += "<br>***** IMPORT ERROR<br>"
                    album_message +=  "<br>%s" % str(ex)
                    error_count += 1
                    album_error = True

                # send information about album status to UI
                if album_error:
                    album_response['error'] = True
                    Messages.add_message(album_message, 'error')
                else:
                    Messages.add_message(album_message, 'success')

                albums.append(album_response)
            
            if len(albums) == 0:
                current_route.CURRENT_ROUTE = 'dropbox'
                return None
    
        except analyzer.InvalidFileError, ex:
            album_message = "<br>***** INVALID FILE ERROR<br>"
            album_message +=  "<br>%s" % str(ex)
            Messages.add_message(album_message, 'error')
            
            # return null if the dropbox is not readable
            return None

        message = "----------<br>Found %d albums.<br>" % album_count
     
        if error_count > 0:
            message += "Saw %d errors" % error_count
            Messages.add_message(message, 'error')

            # TESTING return albums with errors attached
            return albums
       
        message += "No errors found."
        Messages.add_message(message, 'success')
        Messages.add_message("Beginning import.", 'success')

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
        
            message = "%s OK!" % alb.title()
            Messages.add_message(message, 'success')

        # Flush out any remaining tracks.
        if txn:
            txn.commit(LIBRARY_PREFIX)
        
        message = "Import complete. OK!"
        Messages.add_message(message, 'success')
       
        # empty dropbox 
        for dir in os.listdir(MUSIC_DROPBOX):
            if dir.startswith('.'):
                continue
            fn = os.path.join(MUSIC_DROPBOX, dir)
            if not os.path.isdir(fn):
                continue
            shutil.rmtree(fn)

        message = "Dropbox emptied. OK!"
        Messages.add_message(message, 'success')
     
        current_route.CURRENT_ROUTE = 'generate'

        return albums

    def add_artists(self):

        error = False
        drop = dropbox.Dropbox()
        new_artists = set()
        for au_file in drop.tracks():
            try:
                tpe1 = au_file.mutagen_id3["TPE1"].text[0]
            except:
                Messages.add_messaage('** file: %r' % au_file.path, 'error')
                error = True

            if artists.standardize(tpe1) is None:
                new_artists.add(tpe1)

        # do not write if errors
        if not error and new_artists:
            to_print = list(new_artists)
            to_print.extend(artists.all())
            to_print.sort(key=artists.sort_key)
       
            output = codecs.open(artists._WHITELIST_FILE, "w", "utf-8")
            for tpe1 in to_print:
                output.write(tpe1)
                output.write("\n")

            # reload whitelist from file
            artists._init()
            message = "Artist whitelist updated.<br>New artists added:<br>"
            message += "<br>".join(list(new_artists))
            Messages.add_message(message, 'success')

    def get(self):
        self.add_artists()
        inbox = dropbox.Dropbox()
        return self.import_albums(inbox)