App.WhitelistController = Em.ArrayController.extend({
  isSearching: false,
  displayContent: Em.A(),
  query: function() {

    // TODO split to search on individual words

    var searchWord = this.get('searchWord').toUpperCase();
    if (searchWord.length < 2) {
      this.set('isSearching', false);
      return
    } else {
      this.set('isSearching', true);
    }
    var result = this.content.filter(function(item) {
      return item.nameUpper.indexOf(searchWord) !== -1; 
    });
    this.set('displayContent', result);
  },
});

App.WhitelistView = Em.View.extend({
  input: function() {
    this.get('controller').send('query');
  }
});
