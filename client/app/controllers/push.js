App.PushController = Em.Controller.extend({
  //needs: ['application', 'messages'],
  nextPath: 'success',
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
