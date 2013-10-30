App.NavController = Em.Controller.extend({
  needs: ['dropbox', 'import', 'traktor', 'push'],
  error: function() {
    return this.get('controllers.dropbox.status') ||
           this.get('controllers.import.status') ||
           this.get('controllers.traktor.status') ||
           this.get('controllers.push.status');
  }.property('controllers.dropbox.status', 'controllers.import.status', 'controllers.traktor.status', 'controllers.push.status')
});
