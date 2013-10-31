App.ImportController = Em.ArrayController.extend({
  needs: ['application', 'messages'],
  nextPath: 'generate',
  // will return 'error' if an album with an error is present.
  status: function() {

    if (this.findBy('error', true)) {
      return 'error';
    } else if (this.get('working')) {
      return 'working';
    } else if (this.get('working') === false) {
      return 'done';
    } else {
      return null;
    }

  }.property('content.@each.error', 'working'),
  working: null,
});
