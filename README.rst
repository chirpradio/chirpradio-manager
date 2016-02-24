The CHIRP Music Importer
========================

A graphical interface to replace the import scripts provided by the `CHIRP Radio Machine <https://github.com/chirpradio/chirpradio-machine>`_.


Installation
------------

First, you need `chirpradio`_
installed so that the App Engine SDK can be imported.
Follow the `chirpradio install instructions`_.

Next, create a `virtualenv`_ and activate
it. Here's an example of how to do that with `virtualenvwrapper`_::

    mkvirtualenv chirpradio-manager
    workon chirpradio-manager

Now you can install the dependencies with `pip`_::

    pip install -r requirements.txt

The `chirpradio-machine`_ gets installed as one of the requirements but this
requires some setup. If you already installed this in another directory on your
machine, then you can just link to it. Hint: this is the easiest way to do it :)

Change into the directory of where you set it up and link to it to the
virtualenv::

    pushd ~/dev/chirpradio-machine
    python setup.py develop
    popd

If you don't do it this way, you'll have to set up the `chirpradio-machine`_
that you just installed into the virtualenv according to its docs. Since this was
installed into the virtualenv it resides somewhere like
``~/.virtualenvs/chirpradio-manager/src/chirp``.

Start the Server
----------------

Once everything is installed and `chirpradio-machine`_ is properly configured,
you are ready to start the server::

    supervisord -c ./supervisord.conf

Check the contents of the app logs to see how it went::

    less supervisor.log
    less supervisor-app.log

If you don't see any errors,
the server should be available at http://0.0.0.0:5000/

Deployment
----------

Here's how this is deployed on CHIRP's internal server.
You need to run commands as the ``musiclib`` user::

    sudo su musiclib

Start up the server like this::

    cd ~/chirpradio-importer
    source ~/.virtualenvs/chirpradio-importer/bin/activate
    supervisord -c ./supervisord.conf


.. _virtualenv: https://pypi.python.org/pypi/virtualenv
.. _pip: https://pypi.python.org/pypi/pip
.. _chirpradio-machine: https://github.com/chirpradio/chirpradio-machine/
.. _virtualenvwrapper: https://virtualenvwrapper.readthedocs.org/en/latest/
.. _chirpradio: https://github.com/chirpradio/chirpradio
.. _`chirpradio install instructions`: http://chirpradio.readthedocs.org/en/latest/topics/install.html
