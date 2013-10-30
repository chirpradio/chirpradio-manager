
// require compiled templates
require('./templates/result');

// create App
window.App = Em.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#importer'
});
if (window.TESTING) {
  window.App.deferReadiness();
}

// require routes, views and controllers
require('./routes/mixin.js');
require('./routes/**');
require('./views/**');
require('./controllers/**');
