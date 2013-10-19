"""
 from chirpradio-machine: do_dump_new_artists_in_dropbox
"""
import re

from flask.ext.restful import Resource

from chirp.library import dropbox
from chirp.library.album import from_directory, AlbumError
from chirp.library.artists import standardize

class Dropbox(Resource):

    def dump_dropbox(self):
        drop = dropbox.Dropbox()
        albums = []
        for path in sorted(drop._dirs):
            
            try:
                chirp_albums = from_directory(path, fast=True)
            except AlbumError, e:
                albums.append({
                    'error': True,
                    'path': path,
                })
                continue

            for alb in chirp_albums:
                album = {}
                if alb.is_compilation():
                    album['compilation'] = True
                else:
                    album['compilation'] = False
                    album['artist'] = alb.artist_name()
                    
                    if not standardize(album['artist']):
                        album['warning'] = True

                album['title'] = alb.title()
                album['tracks'] = []
                for au_file in alb.all_au_files:
                    number = re.search('^[0-9]*', au_file.mutagen_id3['TRCK'].text[0]).group(0)
                    track = {'number': number, 'title': au_file.tit2()}
                    if album['compilation']:
                        tracks['artist'] = au_file.tpe1()
                    album['tracks'].append(track)

            albums.append(album) 

        return albums

    def get(self):
        return self.dump_dropbox()
