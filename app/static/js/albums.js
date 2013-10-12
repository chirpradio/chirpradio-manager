App.Album = Em.Object.extend();
App.Track = Em.Object.extend();

App.Album.reopenClass({
  all: function(path) {
    return $.getJSON(path).then(function(response) {
    
      var albums = Em.A();
      response.response.albums.forEach(function(album) {
        
        var tracks = Em.A();
        
        album.tracks.forEach(function(track) {
          tracks.push(App.Track.create({
            number: track.number,
            title: track.title,
            trackArtist: track.artist,
            path: track.path,
          }));
        });

        albums.push(App.Album.create({
          artist: album.artist,
          id: album.id,
          isOpen: false,
          path: album.path,
          status: 'success', // TODO implement
          title: album.title,
          tracks: tracks,
        }));
      });
      return albums 
    });
  }
});

App.Inserted = Em.View.extend({
  didInsertElement: function() {
    $('.err').tooltip();
    $('.warning').tooltip();
  }
});
