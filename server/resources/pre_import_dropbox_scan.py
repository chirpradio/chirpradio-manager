import re

from flask.ext.restful import Resource

from flask import current_app

import chirp.library.album
import chirp.library.artists
import chirp.library.dropbox

import current_route
from messages import Messages


def album_to_json(album, path):
    """ Takes a chirp library album and path. Returns a dict of album attributes """

    error = False
    result = {}
    result['path'] = path
    print path
    try:
        result['title'] = album.title().encode('utf-8')
    except UnicodeDecodeError:
        error = True

    result['compilation'] = album.is_compilation()

    if result['compilation']:
        result['artist'] = 'Various Artists'
    else:
        try:
            result['artist'] = album.artist_name().encode('utf-8')
            unicode(result['artist'])
        except UnicodeDecodeError:
            error = True

    # build tracks
    result['tracks'] = []
    for au_file in album.all_au_files:
        track = {}

        # extract track number
        track['number'] = re.search('^[0-9]*', au_file.mutagen_id3['TRCK'].text[0]).group(0)

        try:
            track['title'] = au_file.tit2().encode('utf-8')
        except UnicodeDecodeError:
            error = True

        if result['compilation']:
            try:
                track['artist'] = au_file.tpe1().encode('utf-8')
            except UnicodeDecodeError:
                error = True

        result['tracks'].append(track)

    if error:
        result['error'] = True
        Messages.add_message('There was an error at %s' % path, 'error')
    print error
    return result


class ScanDropbox(Resource):

    def dump_dropbox(self):

        drop = chirp.library.dropbox.Dropbox()
        result = []
        for path in sorted(drop._dirs):
            try:
                chirp_albums = chirp.library.album.from_directory(path, fast=True)
            except chirp.library.album.AlbumError, e:
                Messages.add_message('There was an error at %s.' % path, 'error')
                continue

            # build albums
            for album in chirp_albums:
                json = album_to_json(album, path)
                result.append(json)

        # check for new artists
        new_artists = []
        for data in result:
            print data.get('error')
            if not data.get('error'):
                if chirp.library.artists.standardize(data['artist']) is None:
                    new_artists.append(data['artist'])
                    data['warning'] = True

        if new_artists:
            Messages.add_message('New artists in dropbox: %s' % '<br>'.join(new_artists), 'warning')

        # only progress import process if there are albums in the dropbox
        if len(result) > 0:
            current_route.CURRENT_ROUTE = 'import'

        return result

    def get(self):
        return self.dump_dropbox()
