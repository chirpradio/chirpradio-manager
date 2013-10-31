App.PushRoute = Em.Route.extend({
  model: function() {

    // generate nml file
    return Em.$.getJSON('/push');
  },
  beforeModel: function(transition) {

    var self = this;
    
    // return promise to delay model loading 
    return Em.$.getJSON('/current_route', function(response) {
      
      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {

        // make sure previous routes are marked done
        self.controllerFor('dropbox').set('working', false);
        self.controllerFor('import').set('working', false);
        self.controllerFor('generate').set('working', false);

        // set loading status to true before data is ready
        self.controllerFor('push').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name);
      }
    });

  },
  afterModel: function() {
  
    // set loading status to true before data is ready
    this.controllerFor('push').set('working', false);

    // hide whitelist
    this.controllerFor('application').set('showWhitelist', false);

  },
  renderTemplate: function() {

    // use dropbox template and import controller
    this.render('dropbox', {
      controller: 'import'
    });
  }
});
