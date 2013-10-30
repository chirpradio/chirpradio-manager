App.DropboxRoute = Em.Route.extend({
  model: function() {
    return Em.$.getJSON('/dropbox');
  },
  setupController: function(controller, model) {
    model.forEach(function(album) {

      // check albums for errors
      if (album.error) {
        controller.set('status', 'error');
      }
    });
   
    // set done status if no album errors
    if (!(controller.get('status') === 'error')) {
      controller.set('status', 'done');
    }

    // setup whitelist
    //var self = this;
    //Em.$.getJSON('/whitelist', function(response) {
    //  self.controllerFor('whitelist').set('content', response);
    //});
    
    controller.set('model', model);

  },
  beforeModel: function() {
    this.controllerFor('dropbox').set('status', 'working');
  },
  actions: {
    willTransition: function(transition) {
      if (this.get('controller.error')) {
        transition.abort();
      }
    },
  },
});
