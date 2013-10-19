# remove_from_dropbox.py

import json
import logging
import os
import time

import desub
import sh

from flask import current_app as app
from flask.ext.restful import Resource
from flask.ext.restful import reqparse

from chirp.common import conf

parser = reqparse.RequestParser()
parser.add_argument('data', type=unicode)

class MoveAlbum(Resource):

    def put(self):
        dir = json.loads(parser.parse_args()['data'])
        messages = []
        r_path = app.config['CHIRPRADIO_MACHINE_BIN']
        proc = desub.join(['sudo', r_path, dir])
        proc.start()
        time.sleep(5)
        out = proc.stdout.read()
        err = proc.stderr.read()
        logging.error(err)

        if out:
            messages.append({'status': 'success', 'message': out})
        else:
            message = 'failed to remove album %s from dropbox please remove manually' % (dir)
            messages.append({'status': 'error', 'message': message})

        return {'messages': messages}
