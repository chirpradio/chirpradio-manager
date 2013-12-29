from flask.ext.restful import Resource


# default start route should be import
CURRENT_ROUTE = 'dropbox'

class GetCurrentRoute(Resource):

    def get(self):
        return {'route_name': CURRENT_ROUTE}
