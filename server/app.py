import flask
from flask.ext import restful

from resources.do_periodic_import import ImportAlbums
from resources.messages import GetMessages
from resources.pre_import_dropbox_scan import ScanDropbox
from resources.remove import RemoveAlbum
from resources.whitelist import GetWhitelist
from resources.current_route import GetCurrentRoute

# TODO IN_PROCESS

# keep the client in sync
ERROR = False

# create app and api
app = flask.Flask(__name__)
api = restful.Api(app)

# register resources
api.add_resource(GetMessages, '/messages')       
api.add_resource(GetWhitelist, '/whitelist')       
api.add_resource(ImportAlbums, '/import_albums')       
api.add_resource(RemoveAlbum, '/remove_album')       
api.add_resource(ScanDropbox, '/scan_dropbox')       
api.add_resource(GetCurrentRoute, '/current_route')       


# serve client app at root
@app.route('/')
def index():
    return flask.send_file('index.html')


if __name__ == '__main__':
  
    # serve application
    app.run('0.0.0.0', 5000, debug=True, threaded=True)
