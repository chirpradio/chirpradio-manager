App.Album = Em.Object.extend({
  error: function() {
    return this.get('status') === 'error';
  }.property('status'),
  success: function() {
    return this.get('status') !== 'error' && this.get('status') !== 'warning';
  }.property('status'),
  warning: function() {
    return this.get('status') === 'warning';
  }.property('status'),
  isComp: function() {
    return this.artist === 'Various';
  }.property('artist')
});

App.Track = Em.Object.extend();

App.Album.reopenClass({
  all: function(path) {
    return $.getJSON(path).then(function(response) {
    
      var albums = Em.A();
      response.albums.forEach(function(album) {
        var tracks = Em.A();
        
        album.tracks.forEach(function(track) {
          tracks.push(App.Track.create({
            number: track.number,
            title: track.title,
            trackArtist: track.artist,
            albumId: track.album_id,
            path: track.path,
            message: track.message,
            status: track.status
          }));
        });

        var artist = typeof(album.artist) !== 'string' ? 'Various' : album.artist;

        var message = album.messages.getEach('message').toString();
        albums.push(App.Album.create({
          id: album.album_id,
          title: album.title,
          artist: artist,
          path: album.path,
          tracks: tracks,
          status: album.status,
          messages: album.messages,
          message: message,
          isOpen: false
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
