
The CHIRP Music Manager
=======================

A web-application that provides a simple graphical way to import and edit music in the CHIRP Radio library.

.. contents::
   :local:

Installation
------------------

Requires the CHIRP Radio Machine and the CHIRP Radio cloud application to 
be installed. The WORK_TREE variable in manager_settings.py should point to
the local copy of the CHIRP Radio Machine.

Then::

  pip install -r requirements.txt


Resources
------------------

The application wraps a REST server around the resources that sequentially process an import.
Each resource corresponds to a step or steps from the script based process from the CHRIP Radio Machine.

| do_dump_new_artists_in_dropbox -> app/resources/dropbox.py
| do_dump_new_artists_in_dropbox --rewrite -> app/resources/importalbums.py
| git commit & push -> app/resources/importalbums.py
| do_periodic_import -> app/resources/importalbums.py
| which_remove_from_dropbox -> app/resources/move.py
| do_periodic_import --actually_do_import -> app/resources/importalbums.py
| empty_dropbox -> app/resources/importalbums.py
| do_generate_collection_nml -> app/resources/generate.py
| do_push_artists_to_chirpradio -> app/resources/push.py
| do_push_to_chirpradio -> app/resources/push.py

UI
------------------

The UI is built in Ember and allows for a simple sequential execution of the above steps. 
Additionally album information can be updated by double clicking on the artist name, album
title or track title. Albums that produce errors must be removed from the dropbox by
clicking the X that will appear. Errors must be resolved before the application will let
you proceed.

Quirks
------------------

For now, the application should only be run once a day. Adding the ability to catalog timestamps i
or allow user input of timestamps will correct this problem. The manager_settings.py file
has a DEV variable that when set to True will allow for a dry-run of the import process.

Steps
------------------

Step #1: Scan Dropbox for Tracks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step will show the albums in the dropbox. Carefully proofread the album information. 
Artist, album and track names can be edited by double clicking on them. 
Artist names that are not already in the music library will be highlighted in yellow. 
You should use the search bar on the right to make sure the artist's name is spelled correctly. 
If an error occurs, the album will be highlighted in red and an X will appear next to the album title. 
Click the X to move the album from the dropbox to the needs fixing folder. Albums with errors must be removed to proceed.


Step #2: Import Tracks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step will import the albums in the dropbox into the Chirp Library. It may take a while to run. 
If any albums produce errors, they should be removed by pressing the X. Albums with errors must be removed to proceed.



Step #3: Generate Traktor File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step will create a file named new-collection.nml in the Traktor root directory. 
At this point Traktor can be switched over to the new collection whereby you shut down Traktor, 
rename new-collection.nml to collection.nml and restart Traktor


Step #4: Push Tracks to DJ Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step will upload the artist, album and track info to the DJ Database.
