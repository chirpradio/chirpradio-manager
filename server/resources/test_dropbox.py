import os
import shutil
import unittest

from mock import Mock

from chirp.library import artists, dropbox
from dropbox import Dropbox, AlbumEncodingError

import pprint
pp = pprint.PrettyPrinter(indent=4)

TEST_BASE = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../../testdata')
TEST_DROPBOX = os.path.join(TEST_BASE, 'dropbox')
TEST_NEEDS_FIXING = os.path.join(TEST_BASE, 'needs-fixing')

   # def setUp(self):
   #     self.resource = Dropbox()
   #     album_a = os.path.join(TEST_BASE, 'A')
   #     dest_a = os.path.join(TEST_DROPBOX,'A')
   #     shutil.copytree(album_a, dest_a)
   #     self.response = self.resource.dump_dropbox(TEST_DROPBOX)
   # 
   # def tearDown(self):
   #     dest_a = os.path.join(TEST_DROPBOX,'A')
   #     shutil.rmtree(dest_a)


class TestSortAlbums(unittest.TestCase):
        
    def test_make_album_path(self):
        resource = Dropbox()
        path = '/path/to/mp3/test.mp3'
        album_path = resource._make_album_path(path)
        self.assertEqual(album_path, '/path/to/mp3/')


class TestSortAlbums(unittest.TestCase):
        
    def test_sort_albums(self):
        dropbox = Dropbox()
        album_a = {'title': 'a', 'artist': 'b'}
        album_b = {'title': 'c', 'artist': 'd'}
        result = dropbox._sort_albums([album_b, album_a])
        self.assertEqual(result, [album_a, album_b])

class TestMakeTrack(unittest.TestCase):

    def test_make_track(self):
        # copy album into dropbox
        album_a = os.path.join(TEST_BASE, 'A')
        dest_a = os.path.join(TEST_DROPBOX,'A')
        shutil.copytree(album_a, dest_a)

        # get track
        resource = Dropbox()
        drop = dropbox.Dropbox(dropbox_path=TEST_DROPBOX)
        track = drop.tracks()[0]
        response_track = resource._make_track(track)

        # test track dictionary response
        track_number = track.mutagen_id3['TRCK'].text[0].split('/')[0]
        self.assertEqual(response_track['album'], track.mutagen_id3['TALB'])
        self.assertEqual(response_track['artist'], track.mutagen_id3['TPE1'])
        self.assertEqual(response_track['number'], track_number)
        self.assertEqual(response_track['path'], track.path)
        self.assertEqual(response_track['title'], track.mutagen_id3['TIT2'])
       
        # teardown dropbox 
        dest_a = os.path.join(TEST_DROPBOX,'A')
        shutil.rmtree(dest_a)

    def test_make_track_raises_exception(self):
       
        # copy album into dropbox
        album_a = os.path.join(TEST_BASE, 'no_tpe1')
        dest_a = os.path.join(TEST_DROPBOX,'no_tpe1')
        shutil.copytree(album_a, dest_a)
        
        # get track
        resource = Dropbox()
        drop = dropbox.Dropbox(dropbox_path=TEST_DROPBOX)
        track = drop.tracks()[0]

        # assert raises exception for missing artist
        self.assertRaises(AlbumEncodingError, resource._make_track, track)
        
        # teardown dropbox 
        dest_a = os.path.join(TEST_DROPBOX,'no_tpe1')
        shutil.rmtree(dest_a)
        
class TestMakeAlbum(unittest.TestCase):

    def test_make_album(self):
        # copy album into dropbox
        album_a = os.path.join(TEST_BASE, 'A')
        dest_a = os.path.join(TEST_DROPBOX,'A')
        shutil.copytree(album_a, dest_a)
        
        # get tracks
        resource = Dropbox()
        drop = dropbox.Dropbox(dropbox_path=TEST_DROPBOX)
        tracks = [resource._make_track(au_file) for au_file in drop.tracks()]
        album = resource._make_album(tracks, 0) 
        self.assertEqual(album['id'], 1)
        self.assertEqual(album['artist'], tracks[0]['artist'])
        self.assertEqual(album['comp'], False)
        path = resource._make_album_path(tracks[0]['path'])
        self.assertEqual(album['path'], path)
        self.assertEqual(album['title'], tracks[0]['album'])
        self.assertEqual(album['tracks'], tracks)
         
        # teardown dropbox 
        dest_a = os.path.join(TEST_DROPBOX,'A')
        shutil.rmtree(dest_a)
        



    #def test_response(self):
    #    self.assertIsInstance(self.response, dict)

    #def test_keys(self):

    #    # test response structure
    #    self.assertIsInstance(self.response, dict) 
    #    self.assertEqual(1, len(self.response.keys()))
    #    self.assertIn('albums', self.response.keys())
    #    # test response keys
    #    self.assertEqual(1, len(self.response['albums']))
    #    
    #    # test album structure
    #    album = self.response['albums'][0]
    #    album_keys = album.keys()
    #    self.assertIsInstance(album, dict)
    #    self.assertEqual(7, len(album_keys))

    #    # test album keys
    #    self.assertIn('album_id', album_keys)
    #    self.assertIn('artist', album_keys)
    #    self.assertIn('messages', album_keys)
    #    self.assertIn('path', album_keys)
    #    self.assertIn('title', album_keys)
    #    self.assertIn('tracks', album_keys)

    #    # test album values
    #    self.assertEqual(1, album['album_id'])
    #    self.assertEqual('A Artist', album['artist'])
    #    self.assertEqual('A Album', album['title'])
    #    self.assertEqual(os.path.join(TEST_DROPBOX, 'A'), album['path'])

    #    # test track structure
    #    tracks = album['tracks']
    #    self.assertEqual(4, len(tracks))

    #    for i, track in enumerate(tracks):
    #    
    #        # test track keys
    #        self.assertIn('album', track)
    #        self.assertIn('artist', track)
    #        self.assertIn('number', track)
    #        self.assertIn('path', track)
    #        self.assertIn('title', track)
    #   
    #        # test track values
    #        self.assertEqual('A Album', track['album'])
    #        self.assertEqual('A Artist', track['artist'])
    #        self.assertEqual(str(i+1), track['number'])
    #        title = 'A' + str(i) + '.mp3'
    #        self.assertEqual(os.path.join(TEST_DROPBOX, 'A', title), track['path'])


class TestNotNewArtist(TestDropbox):

    def setUp(self):
        artists.standardize = Mock(return_value='Artist A')
        super(TestNotNewArtist, self).setUp()
       
    def test_not_new_artist(self):
        album = self.response['albums'][0]
        self.assertIsNone(album['status'])
        self.assertEqual(0, len(album['messages']))

         
#class TestNewArtist(TestDropbox):
#
#    def test_new_artist(self):
#        album = self.response['albums'][0]
#        self.assertEqual('warning', album['status'])
#        self.assertEqual(1, len(album['messages']))
#
#        # test message
#        message = album['messages'][0]
#        self.assertEqual('New artist name. Check the artist list', message['message'])
#        self.assertEqual('warning', message['status'])
       
#        
#class TestScanError(unittest.TestCase):
#
#    def setUp(self):
#        self.resource = Dropbox()
#        no_tpe1 = os.path.join(TEST_BASE, 'no_tpe1')
#        dest_no_tpe1 = os.path.join(TEST_DROPBOX,'no_tpe1')
#        shutil.copytree(no_tpe1, dest_no_tpe1)
#        self.response = self.resource.dump_dropbox(TEST_DROPBOX)
#       
#    def tearDown(self):
#        dest_no_tpe1 = os.path.join(TEST_DROPBOX,'no_tpe1')
#        shutil.rmtree(dest_no_tpe1)
#
#    def test_dropbox_error(self):
#        #pp.pprint(self.response)
#        album = self.response['albums'][0]
#        self.assertEqual(album['artist'], '*error*')
#        self.assertEqual('error', album['status'])
#        self.assertEqual(1, len(album['messages']))
#        
#        # test message
#        message = album['messages'][0]
#        self.assertEqual('error', message['status'])
#
#
#class TestDropboxError(unittest.TestCase):
#
#    def setUp(self):
#        self.resource = Dropbox()
#        not_mp3 = os.path.join(TEST_BASE, 'not_mp3')
#        dest_not_mp3 = os.path.join(TEST_DROPBOX,'not_mp3')
#        shutil.copytree(not_mp3, dest_not_mp3)
#        self.response = self.resource.dump_dropbox(TEST_DROPBOX)
#       
#    def tearDown(self):
#        dest_not_mp3 = os.path.join(TEST_DROPBOX,'not_mp3')
#        shutil.rmtree(dest_not_mp3)
#
#    def test_dropbox_error(self):
#        album = self.response['albums'][0]
#        self.assertEqual(album['artist'], '*error*')
#        self.assertEqual('error', album['status'])
#        self.assertEqual(1, len(album['messages']))
#        
#        # test message
#        message = album['messages'][0]
#        self.assertEqual('error', message['status'])

if __name__ == '__main__':
    unittest.main()
