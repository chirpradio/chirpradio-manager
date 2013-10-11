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
});

App.DropboxController = Em.ArrayController.extend({
  nextPath: 'dropbox',
});

App.ToggleView = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['toggle'],
  click: function(event) {
    this.set('parentView.open', !this.get('parentView.open'));
  },
  toggle: function() { 
    if (this.get('parentView.open')) {
      return 'icon-arrow-down';
    } else {
      return 'icon-arrow-right';
    }
  }.property('parentView.open'),
});

App.AlbumView = Em.View.extend({
  open: false
});
