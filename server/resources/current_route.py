from flask.ext.restful import Resource

CURRENT_ROUTE = 'import'

class GetCurrentRoute(Resource):

    def get(self):
        return {'route_name': CURRENT_ROUTE}
