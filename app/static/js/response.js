App.Response = Em.Object.extend({
  albums: Em.A(),
  messages: Em.A()
});

App.Response.reopenClass({
  all: function(path) {
    return $.getJSON(path).then(function(response) {
      return App.Response.create({
        albums: response.albums,
        messages: response.messages
      });
    });
  }
});
