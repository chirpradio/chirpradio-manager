from flask import Flask, send_file
from flask.ext.restful import Api

from resources.dropbox import Dropbox
from resources.generate import GenerateTraktorLibrary
#from resources.importalbums import ImportAlbums
from resources.move import MoveAlbum
#from resources.push import PushToCloud
from resources.update import UpdateAlbums
from resources.whitelist import Whitelist


SERVER_NAME = '0.0.0.0'
SERVER_PORT = 5000


app = Flask(__name__)
app.config.from_object('settings')
api = Api(app)
api.add_resource(Dropbox, '/dropbox')       
api.add_resource(GenerateTraktorLibrary, '/generate')
#api.add_resource(ImportAlbums, '/import')
api.add_resource(MoveAlbum, '/move')
#api.add_resource(PushToCloud, '/push')
api.add_resource(UpdateAlbums, '/update')
api.add_resource(Whitelist, '/whitelist')


@app.route('/')
def index():
    return send_file('index.html')


if __name__ == '__main__':

    app.run(SERVER_NAME, SERVER_PORT, debug=True)