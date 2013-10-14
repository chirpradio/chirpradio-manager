"""
 from chirpradio-machine: do_dump_new_artists_in_dropbox
"""
import re

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
                    
                    if not chirp.artists.standardize(album['artist']):
                        album['warning'] = True

                album['title'] = alb.title()
                album['tracks'] = []
                for au_file in alb.all_au_files:
                    number = re.search('^[0-9]*', au_file.mutagen_id3['TRCK'].text[0]).group(0)
                    album['tracks'].append({
                        'number': number,
                        'title': au_file.tit2(),
                    })
            album['error'] = True
            albums.append(album) 
        return albums

    def get(self):
        return self.dump_dropbox()
