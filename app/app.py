import logging

from flask import Flask, render_template
from flask.ext.restful import Api

from resources.dropbox import Dropbox
from resources.generate import GenerateTraktorLibrary
from resources.importalbums import ImportAlbums
from resources.move import MoveAlbum
from resources.push import PushToCloud
from resources.update import UpdateAlbums
from resources.whitelist import Whitelist

logging.basicConfig(filename="importer.log", level=logging.DEBUG)

SERVER_NAME = '0.0.0.0'
SERVER_PORT = 5000

app = Flask(__name__)
app.config.from_object('manager_settings')
api = Api(app)

api.add_resource(Dropbox, '/dropbox')
api.add_resource(GenerateTraktorLibrary, '/generate')
api.add_resource(ImportAlbums, '/import')
api.add_resource(MoveAlbum, '/move')
api.add_resource(PushToCloud, '/push')
api.add_resource(UpdateAlbums, '/update')
api.add_resource(Whitelist, '/whitelist')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':

    app.run(SERVER_NAME, SERVER_PORT, debug=True)
