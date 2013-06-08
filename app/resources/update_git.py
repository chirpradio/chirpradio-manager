import sh

from flask import current_app as app

from chirp.library import artists

def update():
    GIT_DIR = '--git-dir=' + app.config['GIT_DIR']
    WORK_TREE = '--work-tree=' + app.config['WORK_TREE']
    sh.git(GIT_DIR, WORK_TREE, 'commit', artists._WHITELIST_FILE, '-m', 'Adding new artists')
    sh.git(GIT_DIR, WORK_TREE, 'push')
