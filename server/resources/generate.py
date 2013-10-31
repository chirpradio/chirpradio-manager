import subprocess

from flask.ext.restful import Resource

from messages import Messages
import current_route

class GenerateTraktorLibrary(Resource):

    def get(self):
        
        generate_nml_out = subprocess.check_output('do_generate_collection_nml', shell=True, stderr=subprocess.STDOUT)
        Messages.add_message(generate_nml_out, 'success')
        install = 'install -m 0775 -g traktor output.nml /mnt/disk_array/traktor/TraktorProRootDirectory/new-collection.nml'
        subprocess.call(install, shell=True, stderr=subprocess.STDOUT)

        current_route.CURRENT_ROUTE = 'push'
