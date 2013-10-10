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
    var status = this.get('controller.status');
    if (status === 'working') {
      return 'icon-spinner icon-spin';
    } else if (status === 'done') {
      return 'icon-ok';
    } else if (status === 'error') {
      return 'icon-remove';
    }
  }.property('controller.status'),
});

// App.NextButton
// attributeBinding: ['disabled']
// disabled: if else 
