import logging
from logging.handlers import RotatingFileHandler

import flask
from flask.ext import restful

from resources.current_route import GetCurrentRoute
from resources.do_periodic_import import ImportAlbums
from resources.do_push import Push
from resources.generate import GenerateTraktorLibrary
from resources.messages import GetMessages
from resources.pre_import_dropbox_scan import ScanDropbox
from resources.remove import RemoveAlbum
from resources.whitelist import GetWhitelist


# create app and api
app = flask.Flask(__name__)
api = restful.Api(app)


# setup logging
handler = RotatingFileHandler('import.log', maxBytes=100000, backupCount=1)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)


# register resources
api.add_resource(GenerateTraktorLibrary, '/generate')       
api.add_resource(GetCurrentRoute, '/current_route')       
api.add_resource(GetMessages, '/messages')       
api.add_resource(GetWhitelist, '/whitelist')       
api.add_resource(ImportAlbums, '/import_albums')       
api.add_resource(Push, '/push')       
api.add_resource(RemoveAlbum, '/remove_album')       
api.add_resource(ScanDropbox, '/scan_dropbox')       

# serve client app at root
@app.route('/')
def index():
    return flask.send_file('index.html')


if __name__ == '__main__':
  
    # serve application
    app.run('0.0.0.0', 5000, debug=True, threaded=True)
