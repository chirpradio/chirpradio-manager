// async load template
$.ajax({
  url: '/static/hbs/nav.html',
  async: false,
  dataType: 'text',
  success: function(response) {
    App.NavView = Em.View.extend({
      template: Em.Handlebars.compile(response),
      tagName: '',
    });
  }
});

App.StatusIcon = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['status'],
  status: function() {
  var resource = this.get('resource');
  var status = this.get('controller').get('controllers.'+resource+'.status');
    if (status === 'working') {
      return 'icon-spinner icon-spin';
    } else if (status === 'done') {
      return 'icon-ok';
    } else if (status === 'error') {
      return 'icon-remove';
    }
  }.property('controllers.dropbox.status'),
});

App.NextButton = Em.View.extend({
  tagName: 'button',
  template: Em.Handlebars.compile('Next Step'),
  classNames: ['btn'],
  attributeBindings: ['disabled'],
  disabled: function() {
    return this.get('controller.error');
  }.property('controller.error')
});
