# get artist whitelist

from flask.ext.restful import Resource

from chirp.library import artists


class GetWhitelist(Resource):

    def get(self):
        whitelist = artists.all()
        whitelist.sort(key=artists.sort_key)
        return whitelist
