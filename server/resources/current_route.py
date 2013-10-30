from flask.ext.restful import Resource

CURRENT_ROUTE = 'dropbox'

class GetCurrentRoute(Resource):

    def get(self):
        return {'route_name': CURRENT_ROUTE}
