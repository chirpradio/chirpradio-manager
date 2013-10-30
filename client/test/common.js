Ember.testing = true;
App.rootElement = '#qunit'
App.setupForTesting();
App.injectTestHelpers();

// mockjax settings
$.mockjaxSettings.logging = false;

// helper functions
function stubData(route, data) {
  App.__container__.lookup('route:' + route)['model'] = function() { return data; }
}

function exists(selector, description) {
  return ok(!!find(selector).length, description);
}

// setup mockjax
$.mockjax({
  url: '/remove_album',
  responseText: 'ok',
});

$.mockjax({
  url: '/whitelist',
  responseText: ['Wilco']
});

$.mockjax({
  url: '/add_artists',
  responseText: [{message: 'Artist whitelist updated.', status: 'success'}]
});

$.mockjax({
  url: '/messages',
  responseText: 'ok',
});
