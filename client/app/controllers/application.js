App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'traktor', 'push'],
  actions: { 
    next: function() {
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
});
