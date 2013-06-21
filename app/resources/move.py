# remove_from_dropbox.py

import json
import logging
import os

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
        bin_path = app.config['CHIRPRADIO_MACHINE_BIN']
        path = os.path.join(bin_path, 'remove_from_dropbox')
        proc = desub.join(['sudo', path, dir])
        proc.start()
        while proc.is_running():
            continue
        out = proc.stdout.read()
        err = proc.stderr.read()
        if out:
            messages.append({'status': 'success', 'message': out})
        if err:
            messages.append({'status': 'error', 'message': err})
        
        return {'messages': messages}
