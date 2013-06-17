# remove_from_dropbox.py

import json
import logging
import os

import sh

from flask.ext.restful import Resource
from flask.ext.restful import reqparse

from chirp.common import conf

parser = reqparse.RequestParser()
parser.add_argument('data', type=unicode)
        
class MoveAlbum(Resource):

    def put(self):
        dir = json.loads(parser.parse_args()['data'])
        messages = []

        # remove_from_dropbox.py
        if not os.path.exists(dir):
            message = 'directory does not exist: %r; it must be an absolute path' % dir
            messages.append({'message': message, 'status': 'error'})
        if not os.path.isdir(dir):
            message = 'path %r is not a directory' % dir
            messages.append({'message': message, 'status': 'error'})
        base = os.path.basename(dir)
        if not os.path.exists(conf.MUSIC_DROPBOX_FIX):
            message = ('the fixit dir %r does not exist; check your settings'
                       % conf.MUSIC_DROPBOX_FIX)
            messages.append({'message': message, 'status': 'error'})
        dest = os.path.join(conf.MUSIC_DROPBOX_FIX, base)
        if os.path.exists(dest):
            message = ('This album %r has already been set aside! It needs to be'
                        ' removed from the Needs-Fixing dir first' % dest)
            messages.append({'message': message, 'status': 'error'})

        if messages:
            return {'messages': messages}
        else:
            try: 
                os.rename(dir, dest) 
                with sh.sudo:
                    sh.chown('-R', 'musiclib', ("%s" % dest))
                    sh.chgrp('-R', 'traktor', ("%s" % dest))
                    sh.chmod('-R', '0775', ("%s" % dest))
                message = "Successfully moved %r -> %r" % (dir, dest)
                messages.append({'message': message, 'status': 'success'})
            except Exception, e: 
                logging.exception(e)
                message = "There was a problem moving the album and setting permissions."
                messages.append({'message': message, 'status': 'error'})
            
            return {'messages': messages}
