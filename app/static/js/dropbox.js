// async load template
$.ajax({
  url: '/static/hbs/dropbox.html',
  async: false,
  dataType: 'html',
  success: function(response) {
    App.DropboxView = Em.View.extend({
      template: Em.Handlebars.compile(response),
    });
  }
});

App.DropboxRoute = Em.Route.extend({
  model: function() {
    return Em.$.getJSON('/dropbox');
  },
  setupController: function(controller, model) {
    model.forEach(function(album) {
      if (album.error) {
        controller.set('error', true);
      }
    });
    controller.set('model', model);
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
  nextPath: 'import',
  error: true,
  status: 'working',
});

App.ToggleView = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['toggle'],
  click: function() {
    this.set('parentView.open', !this.get('parentView.open'));
  },
  toggle: function() { 
    return 'icon-arrow-' + (this.get('parentView.open') ? 'down' : 'right');
  }.property('parentView.open'),
});

App.AlbumView = Em.View.extend({
  open: false
});
