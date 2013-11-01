App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'generate', 'push', 'messages'],
  showWhitelist: null,
  actions: { 
    next: function() {

      // clear messages from screen
      this.get('controllers.messages').clear();

      // transition to the next route
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
});
