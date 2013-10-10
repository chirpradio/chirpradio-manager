// Application

App = Em.Application.create();

App.Router.map(function() {
  this.route('landing');
  this.route('dropbox');
});

App.ApplicationController = Em.Controller.extend({
  status: 'working',
  error: false, // 'global' error state
  needs: ['landing', 'dropbox'],
  actions: { 
    next: function() {
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  }
});

// Redirect to landing page

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('landing');
  }
});
