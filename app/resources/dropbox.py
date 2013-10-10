"""
 from chirpradio-machine: do_dump_new_artists_in_dropbox
"""
from flask.ext.restful import Resource

import chirp.library as chirp

class Dropbox(Resource):

    def dump_dropbox(self):
        drop = chirp.dropbox.Dropbox()
        albums = []
        for path in sorted(drop._dirs):
            
            try:
                chirp_albums = chirp.album.from_directory(path, fast=True)
            except chirp.album.AlbumError, e:
                albums.append({
                    'error': True,
                    'path': path,
                })
                continue
           
            for alb in chirp_albums:
                album = {}
                if alb.is_compilation():
                    album['compilation'] = True
                    album['artists'] = alb.all_artist_names()
                else:
                    album['compilation'] = False
                    album['artist'] = alb.artist_name()
                album['title'] = alb.title()
                album['tracks'] = []
                for au_file in alb.all_au_files:
                    album['tracks'].append({
                        'number': au_file.mutagen_id3['TRCK'].text[0],
                        'title': au_file.tit2(),
                    })
            albums.append(album) 
        return albums

    def get(self):
        return self.dump_dropbox()
