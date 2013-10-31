App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'generate', 'push'],
  showWhitelist: null,
  actions: { 
    next: function() {
      // transition to the next route
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
});
