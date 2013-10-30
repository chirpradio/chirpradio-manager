App.ImportRoute = Em.Route.extend({
  model: function() {

    // periodic import
    return Em.$.getJSON('/import_albums');
  },
  setupController: function(controller, model) {

    // TODO git add and push, server?
    controller.set('model', model);
     
  },
  beforeModel: function(transition) {

    var self = this;

    // return promise to delay model loading
    return Em.$.getJSON('/current_route', function(response) {

      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {

        // make sure previous route is marked done
        self.controllerFor('dropbox').set('working', false);

        // set loading status to true before data is ready
        self.controllerFor('import').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name)
      }

    });
  },
  afterModel: function() {

    // set loading status to true before data is ready
    this.controllerFor('import').set('working', false);
    
    // hide whitelist search    
    this.controllerFor('application').set('showWhitelist', false);
        

  },
  renderTemplate: function(controller) {

    // use the dropbox template
    this.render('dropbox', {
      controller: controller
    });

    var view = App.AdjustMessagesView.create();
    view.append();
  }
});
