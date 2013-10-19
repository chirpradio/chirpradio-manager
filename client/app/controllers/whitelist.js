App.WhitelistController = Em.ArrayController.extend({
  isSearching: false,
  displayContent: Em.A(),
  actions: {
    query: function() {
      var searchPhrase = this.get('searchPhrase').toUpperCase();
      if (searchPhrase.length < 2) {
        this.set('isSearching', false);
      } else {
        this.set('isSearching', true);
        var result = this.content.filter(function(artist) {
          return artist.toUpperCase().indexOf(searchPhrase) !== -1;
        });
        this.set('displayContent', result);
      }
    },
  }
});
