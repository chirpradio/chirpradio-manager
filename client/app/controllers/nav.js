App.NavController = Em.Controller.extend({
  needs: ['dropbox', 'import', 'traktor', 'push'],
  error: function() {
    return this.get('controllers.dropbox.status') === 'error'
        || this.get('controllers.import.status') === 'error'
        || this.get('controllers.traktor.status') === 'error'
        || this.get('controllers.push.status');
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'
           , 'controllers.traktor.status'
           , 'controllers.push.status'),
  working: function() {
    return this.get('controllers.dropbox.status') === 'working'
        || this.get('controllers.import.status') === 'working'
        || this.get('controllers.traktor.status') === 'working'
        || this.get('controllers.push.status');
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'
           , 'controllers.traktor.status'
           , 'controllers.push.status')
});
