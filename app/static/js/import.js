// async load template
$.ajax({
  url: '/static/hbs/import.html',
  async: false,
  dataType: 'text',
  success: function(response) {
    App.LandingView = Em.View.extend({
      template: Em.Handlebars.compile(response),
    });
  }
});

App.ImportController = Em.Controller.extend({
  nextPath: 'tracktor',
});
