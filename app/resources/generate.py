# do_generate_collection_nml

import codecs
import sh
import time

from flask.ext.restful import Resource
from flask import current_app as app

from chirp.common import conf
from chirp.library import database
from chirp.library import nml_writer


class GenerateTraktorLibrary(Resource):


    def get(self):
        TRAKTOR_COLLECTION = app.config['TRAKTOR_COLLECTION']
        DEV = app.config['DEV']
        messages = []
        try:
            out_fh = codecs.open("output.nml", "w", "utf-8")

            if DEV: 
                writer = nml_writer.NMLWriter("/", conf.LIBRARY_PREFIX, out_fh)
            else:
                # TODO(trow): Don't hard-wire the drive letter.
                writer = nml_writer.NMLWriter("T:", "/Library", out_fh)

            db = database.Database(conf.LIBRARY_DB)
            count = 0
            start_t = time.time()
            for au_file in db.get_all():
                writer.write(au_file)
                count += 1
                if count % 1000 == 0:
                    elapsed_t = time.time() - start_t
                    logging.info("%d (%.1f/s)...\n" % (count, count / elapsed_t))

            writer.close()
            out_fh.close()
            message = "Wrote %d tracks to collection" % count
            logging.info(message)
            messages.append({'message': message, 'status': 'success'})
        except:
            message = "Failed writing output.nml"
            messages.append({'message': message, 'status': 'error'})

        # Copy the new NML into Traktor's root directory
        if not DEV:
            try:
                sh.install('-m', '0075', '-g', 'traktor', 'output.nml', TRAKTOR_COLLECTION)
            except:
                message = "Failed copying Traktor file to Traktor directory"
                messages.append({'message': message, 'status': 'warning'})

        return {'messages': messages}
