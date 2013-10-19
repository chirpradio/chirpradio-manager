// Redirect to landing page

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('landing');
  },
});
