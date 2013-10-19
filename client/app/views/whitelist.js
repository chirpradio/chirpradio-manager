App.WhitelistView = Em.View.extend({
   input: function() {
     this.get('controller').send('query');
   }
});
