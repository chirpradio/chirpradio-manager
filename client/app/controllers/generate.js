App.GenerateController = Em.Controller.extend({
  //needs: ['application', 'messages'],
  nextPath: 'push',
  // will return 'error' if an album with an error is present.
  status: function() {

    if (this.get('working')) {
      return 'working';
    } else if (this.get('working') === false) {
      return 'done';
    } else {
      return null;
    }

  }.property('working'),
  working: null,
});
