import chirp.library.album
import chirp.library.artists
import chirp.library.dropbox


class Album(chirp.library.album.Album):

    def __init__(self, path):
        self.path = path

    def to_json(self):
        result = {}
        result['path'] = self.path
        result['title'] = self.title()
        
        # artist name 
        result['compilation'] = self.is_compilation()
        if result['compilation']:
            album['artist'] = 'Various Artists'
        else:
            album['artist'] = self.artist_name()

        # build tracks
        album['tracks'] = []
        for au_file in self.all_au_files:
            track = {}

            # extract track number
            track['number'] = re.search('^[0-9]*', au_file.mutagen_id3['TRCK'].text[0]).group(0)
            
            track['title'] = au_file.tit2()
            
            if album['compilation']:
                track['artist'] = au_file.tpe1()

            result['tracks'].append(track)

        return result
