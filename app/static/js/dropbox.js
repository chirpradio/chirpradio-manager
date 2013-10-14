App.DropboxRoute = Em.Route.extend({
  model: function() {
    return Em.$.getJSON('/dropbox');
  },
  setupController: function(controller, model) {
    
    model.forEach(function(album) {
      if (album.error) {
        controller.set('status', 'error');
      }
      if (album.warning) {
        controller.set('status', 'warning');
      }
    });
    
    if (!(controller.get('status') === 'error')) {
      controller.set('status', 'done');
    }

    // setup whitelist
    var self = this;
    Em.$.getJSON('/whitelist', function(response) {
      self.controllerFor('whitelist').set('content', response);
    });

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

App.DropboxController = Em.ArrayController.extend({
  needs: ['application', 'whitelist'],
  nextPath: 'import',
  status: null,
});

App.ToggleView = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['toggle'],
  click: function() {
    var open = this.get('parentView.open');
    this.get('parentView.parentView.childViews').forEach(function(albumView) {
      albumView.set('open', false);
    });
    if (!open) {
      this.set('parentView.open', !this.get('parentView.open'));
    }
  },
  toggle: function() { 
    return 'icon-arrow-' + (this.get('parentView.open') ? 'down' : 'right');
  }.property('parentView.open'),
});

App.AlbumView = Em.View.extend({
  open: false,
});
