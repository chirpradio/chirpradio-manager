App.DropboxRoute = Em.Route.extend({
  model: function() {
    
    // periodic import
    return Em.$.getJSON('/scan_dropbox').error(function() {
      return [];
    });
  },
  beforeModel: function(transition) {

    var self = this;

    // return promise to delay model loading
    return Em.$.getJSON('/current_route', function(response) {
      
      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {
        
        // set loading status to true before data is ready
        this.controllerFor('dropbox').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name);
      }
    });

  },
  afterModel: function() {
  
    // set loading status to false after data is ready
    this.controllerFor('dropbox').set('working', false);

    // grab remaining messages from server
    var messageController = this.controllerFor('messages');
    Em.$.getJSON('/messages', function(response) {
      messageController.unshiftObjects(response);
    });

  },
  setupController: function(controller, model) {
     
    var self = this;
       
    // load whitelist
    Em.$.getJSON('/whitelist', function(response) {
      self.controllerFor('whitelist').set('model', response);
      self.controllerFor('application').set('showWhitelist', true);
    });

    // no albums in dropbox
    if (model.length === 0) {
      controller.set('error', true);
    }

    controller.set('model', model);
  },

});
