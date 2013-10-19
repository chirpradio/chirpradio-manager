require('./templates/result');
window.App = Em.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#importer'
});
if (window.TESTING) {
  //window.App.deferReadiness();
}
require('./routes/router');
require('./routes/dropbox');
require('./routes/index');
require('./views/dropbox');
require('./views/nav');
require('./views/whietlist');
require('./controllers/application');
require('./controllers/import');
require('./controllers/message');
require('./controllers/push');
require('./controllers/whitelist');
require('./controllers/dropbox');
require('./controllers/landing');
require('./controllers/nav');
require('./controllers/traktor');
