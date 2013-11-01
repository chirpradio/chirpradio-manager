App.NavController = Em.Controller.extend({
  needs: ['dropbox', 'import', 'generate', 'push'],
  error: function() {
    return this.get('controllers.dropbox.status') === 'error'
        || this.get('controllers.import.status') === 'error';
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'),
  working: function() {
    return this.get('controllers.dropbox.status') === 'working'
        || this.get('controllers.import.status') === 'working'
        || this.get('controllers.generate.status') === 'working'
        || this.get('controllers.push.status');
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'
           , 'controllers.generate.status'
           , 'controllers.push.status')
});
