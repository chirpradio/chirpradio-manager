# modify id3 tags

import json

from flask.ext.restful import Resource, reqparse

from mutagen.easyid3 import EasyID3

parser = reqparse.RequestParser()
parser.add_argument('data', type=unicode)

class UpdateAlbums(Resource):
    
    def put(self):
        data = json.loads(parser.parse_args()['data'])
        artist = data.get('artist')
        album = data.get('title')
        for track in data.get('tracks'):
            mp3 = EasyID3(track.get('path'))
            mp3['album'] = album
            mp3['title'] = track.get('title')
            mp3['artist'] = track.get('trackArtist') if artist == 'Various' else artist
            mp3.save()
        return True
