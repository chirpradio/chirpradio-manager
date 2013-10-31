App.StatusIcon = Em.View.extend({
  boundController: function () {
    // return the controller bound by name from the nav template
    return this.get('controller').get('controllers.'+this.get('resource'));
  }.property(),
  tagName: 'i',
  classNameBindings: ['status'],
  status: function() {
    var status = this.get('boundController.status');
    if (status === 'working') {
      return 'icon-spinner icon-spin';
    } else if (status === 'done') {
      return 'icon-ok';
    } else if (status === 'error') {
      return 'icon-remove';
    }
  }.property('boundController.status'),
});

App.NextButton = Em.View.extend({
  click: function(event) {

    // ask application controller to transition to the next route
    this.get('controller').send('next');

    // remove focus from button
    event.target.blur();
  },
  tagName: 'button',
  template: Em.Handlebars.compile('Next Step'),
  classNames: ['btn'],
  attributeBindings: ['disabled'],
  disabled: function() {
    return this.get('controller.error') || this.get('controller.working');
  }.property('controller.error', 'controller.working')
});
