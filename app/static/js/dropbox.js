// async load template
$.ajax({
  url: '/static/hbs/dropbox.html',
  async: false,
  dataType: 'text',
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
  open: false,
  toggle: function() { 
    if (this.open) {
      return 'icon-arrow-down';
    } else {
      return 'icon-arrow-right';
    }
  }.property('open'),
  click: function(event) {
    this.set('open', !this.open);
  },
});
