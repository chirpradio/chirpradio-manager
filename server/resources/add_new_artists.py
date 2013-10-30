import codecs

from flask.ext.restful import Resource

from chirp.library import artists
from chirp.library import dropbox

from messages import Messages

class AddArtists(Resource):

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

            artists._init()
            message = "Artist whitelist updated.<br>New artists added:<br>"
            message += "<br>".join(list(new_artists))
            Messages.add_message(message, 'success')

    def get(self):
        self.add_artists()
        return None
