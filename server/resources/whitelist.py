# get artist whitelist

from flask.ext.restful import Resource

from chirp.library import artists


class Whitelist(Resource):

    def get(self):
        artists.all()
        whitelist = artists.all()
        whitelist.sort(key=artists.sort_key)
        return whitelist
