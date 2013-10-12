// async load template
$.ajax({
  url: '/static/hbs/traktor.html',
  async: false,
  dataType: 'text',
  success: function(response) {
    App.TraktorView = Em.View.extend({
      template: Em.Handlebars.compile(response),
    });
  }
});

App.TraktorController = Em.Controller.extend({
  nextPath: 'push',
  status: null
});
