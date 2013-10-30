App.MessageView = Em.View.extend({
  tagName: 'li',
  template: Em.Handlebars.compile('{{{message}}}'),
  classNameBindings: ['messageStatus'],
  messageStatus: function() {
    var messageStatus = this.get('content.status');
    if (messageStatus === 'success') {
      return 'success-message';
    } else if (messageStatus === 'warning') {
      return 'warning-message';
    } else if (messageStatus === 'error') {
      return 'error-message';
    }
  }.property()
});
