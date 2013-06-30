App.Message = Em.Object.extend({
  success: false,
  warning: false,
  error: false,
  message: null
});

App.MessagesController = Em.ArrayController.extend({
  addMessages: function(messages) {
    var self = this;
    messages.forEach(function(message) {
      if (!self.findProperty('message', message.message)) {
        self.unshiftObject(App.Message.create({
          message: message.message,
          error: (message.status === 'error'),
          success: (message.status === 'success'),
          warning: (message.status === 'warning')
        }));
      }
    });
  },
  getMessages: function(resource) {
    var self = this;
    return $.getJSON(resource, function(response) {
      var messages = Em.A();
      response.messages.forEach(function(message) {
        self.unshiftObject(App.Message.create({
          message: message.message,
          error: (message.status === 'error'),
          success: (message.status === 'success'),
          warning: (message.status === 'warning')
        }));
      });
    });
  }
});

