import os
import subprocess

from flask.ext.restful import Resource, reqparse

from messages import Messages


# post data parser
parser = reqparse.RequestParser()
parser.add_argument('path', type=unicode)


class RemoveAlbum(Resource):

    def post(self):
        album_path = parser.parse_args()['path']
        if not os.path.exists:
            Messages.add_message('Album at path %s not in dropbox.' % album_path, 'warning')
            # return True to remove the album detail from the UI
            return {'success': True}
        remove_from_dropbox = "/home/musiclib/.virtualenvs/chirpradio-machine/bin/remove_from_dropbox"
        exit_status = subprocess.call("sudo %s %s" % (remove_from_dropbox, album_path), shell=True)

        if exit_status == 0:
            Messages.add_message('Successfully removed album %s from dropbox.' % album_path, 'success')
            return {'success': True}
        else:
            Messages.add_message('Failed to remove album %s from dropbox, please remove manually' % album_path, 'error')
            return {'success': False}
