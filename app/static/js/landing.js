// async load template
$.ajax({
  url: '/static/hbs/landing.html',
  async: false,
  dataType: 'text',
  success: function(response) {
    App.LandingView = Em.View.extend({
      template: Em.Handlebars.compile(response),
    });
  }
});

App.LandingController = Em.Controller.extend({
  nextPath: 'dropbox',
});
