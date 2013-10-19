App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'traktor', 'push'],
  actions: { 
    next: function() {
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
  error: function() {
    return this.controllers.filterBy('status', 'error').get('length') > 0;
  }.property('controllers.@each.status')
});
