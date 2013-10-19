App.rootElement = '#qunit'
App.setupForTesting();
App.injectTestHelpers();


module('testing', {
  setup: function() {
    Ember.run(function() {
      App.reset();
      App.deferReadiness();
    });
  }
});

test('landing page displays instructions', function() {
  Ember.run(App, 'advanceReadiness');
  visit('landing').then(function() {
    equal(find('#instructions li').length, 4, 'there are 4 instructions on the page');
  });
});
