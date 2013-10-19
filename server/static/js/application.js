(function() {

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"tabbable tabs-left\">\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "nav", options) : helperMissing.call(depth0, "render", "nav", options))));
  data.buffer.push("\n  <div class=\"span9\">\n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  </div>\n  <div class=\"span3\">\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "whitelist", options) : helperMissing.call(depth0, "render", "whitelist", options))));
  data.buffer.push("\n  </div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["dropbox"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.view.call(depth0, "App.AlbumView", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\n  <tr ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': (":album error:error warning:warning")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n    <td class=\"arrow\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ToggleView", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"album-title title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"artist\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"end\"></td>\n  </tr>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "view.open", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "artist", "as", "artist", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tracks", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n  <tr class=\"track\">\n    <td class=\"number\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "number", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"title\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"artist\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "artist", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n    <td class=\"end\"></td>\n  </tr>\n      ");
  return buffer;
  }

  data.buffer.push("<table class=\"table\">\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</table>\n");
  return buffer;
  
});

Ember.TEMPLATES["import"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["landing"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h3>Instructions</h1>\n<ol id=\"instructions\">\n  <li>\n    <p>This step will show the albums in the dropbox. Carefully proofread the album information. Artist, album and track names can be edited by double clicking on them. Artist names that are not already in the music library will be highlighted in yellow. You \n      should use the search bar on the right to make sure the artist's name is spelled correctly. If an error occurs, the album will be highlighted in red and an X will appear next to the album title. Click the X to move the album from the dropbox to the \n      needs fixing folder. Albums with errors must be removed to proceed.</p>\n  </li>\n  <li>\n    <p>This step will import the albums in the dropbox into the Chirp Library. It may take a while to run. If any albums produce errors, they should be removed by pressing the X. Albums with errors must be removed to continue.</p>\n  </li>\n  <li>\n    <p>This step will create a file named new-collection.nml in the Traktor root directory. At this point Traktor can be switched over to the new collection whereby you shut down Traktor, rename new-collection.nml to collection.nml and restart Traktor</p>\n  </li>\n  <li>\n    <p>This step will upload the artist, album and track info to the DJ Database.</p>\n  </li>\n</ol>\n");
  
});

Ember.TEMPLATES["nav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<ul class=\"nav nav-tabs\">\n  <li class=\"nav-header\"><a href=\"/\">Importer</a></li>\n  <li>1. Scan Dropbox for Tracks ");
  hashContexts = {'resource': depth0};
  hashTypes = {'resource': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.StatusIcon", {hash:{
    'resource': ("dropbox")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n  <li>2. Import Tracks");
  hashContexts = {'resource': depth0};
  hashTypes = {'resource': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.StatusIcon", {hash:{
    'resource': ("import")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n  <li>3. Generate Traktor File");
  hashContexts = {'resource': depth0};
  hashTypes = {'resource': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.StatusIcon", {hash:{
    'resource': ("traktor")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n  <li>4. Push Tracks to DJ Database");
  hashContexts = {'resource': depth0};
  hashTypes = {'resource': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.StatusIcon", {hash:{
    'resource': ("push")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n  <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.NextButton", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n</ul>\n");
  return buffer;
  
});

Ember.TEMPLATES["push"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["traktor"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  return buffer;
  
});

Ember.TEMPLATES["whitelist"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    <div id=\"search-result\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "name", "in", "displayContent", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n      <div>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</div>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"artist-search\">\n  ");
  hashContexts = {'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'valueBinding': ("searchPhrase"),
    'placeholder': ("Type to search the artist list")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isSearching", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

})();

(function() {

window.App = Em.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#importer'
});
if (window.TESTING) {
  //window.App.deferReadiness();
}


})();

(function() {

App.Router.map(function() {
  this.route('landing');
  this.route('dropbox');
  this.route('import');
});


})();

(function() {

App.DropboxRoute = Em.Route.extend({
  model: function() {
    return Em.$.getJSON('/dropbox');
  },
  setupController: function(controller, model) {
    
    model.forEach(function(album) {
      if (album.error) {
        controller.set('status', 'error');
      }
      if (album.warning) {
        controller.set('status', 'warning');
      }
    });
    
    if (!(controller.get('status') === 'error')) {
      controller.set('status', 'done');
    }

    // setup whitelist
    var self = this;
    Em.$.getJSON('/whitelist', function(response) {
      self.controllerFor('whitelist').set('content', response);
    });

    controller.set('model', model);

  },
  beforeModel: function() {
    this.controllerFor('dropbox').set('status', 'working');
  },
  actions: {
    willTransition: function(transition) {
      if (this.get('controller.error')) {
        transition.abort();
      }
    },
  },
});


})();

(function() {

// Redirect to landing page

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('landing');
  },
});


})();

(function() {

App.AlbumView = Em.View.extend({
  open: false,
});

App.ToggleView = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['toggle'],
  click: function() {
    var open = this.get('parentView.open');
    this.get('parentView.parentView.childViews').forEach(function(albumView) {
      albumView.set('open', false);
    });
    if (!open) {
      this.set('parentView.open', !this.get('parentView.open'));
    }
  },
  toggle: function() { 
    return 'icon-arrow-' + (this.get('parentView.open') ? 'down' : 'right');
  }.property('parentView.open'),
});


})();

(function() {

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
  click: function() {
    this.get('controller').send('next');
  },
  tagName: 'button',
  template: Em.Handlebars.compile('Next Step'),
  classNames: ['btn'],
  attributeBindings: ['disabled'],
  disabled: function() {
    return this.get('controller.error');
  }.property('controller.error')
});


})();

(function() {

App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'traktor', 'push'],
  actions: { 
    next: function() {
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
  error: function() {
    return this.controllers.filterBy('status', 'error').get('length') > 0;
  }.property('controllers.@each.status')
});


})();

(function() {

App.ImportController = Em.Controller.extend({
  nextPath: 'tracktor',
  status: null,
});


})();

(function() {

App.MessagesController = Em.ArrayController.extend({
  addMessages: function(messages) {
    var self = this;
    messages.forEach(function(message) {
      if (!self.findProperty('message', message.message)) {
        self.unshiftObject(App.Message.create({
          message: message.message,
          error: (message.status === 'error'),
          success: (message.status === 'success'),
          warning: (message.status === 'warning')
        }));
      }
    });
  },
  getMessages: function(resource) {
    var self = this;
    return $.getJSON(resource, function(response) {
      var messages = Em.A();
      response.messages.forEach(function(message) {
        self.unshiftObject(App.Message.create({
          message: message.message,
          error: (message.status === 'error'),
          success: (message.status === 'success'),
          warning: (message.status === 'warning')
        }));
      });
    });
  }
});



})();

(function() {

App.PushController = Em.Controller.extend({
  nextPath: 'success',
  status: null,
});


})();

(function() {

App.WhitelistController = Em.ArrayController.extend({
  isSearching: false,
  displayContent: Em.A(),
  actions: {
    query: function() {
      var searchPhrase = this.get('searchPhrase').toUpperCase();
      if (searchPhrase.length < 2) {
        this.set('isSearching', false);
      } else {
        this.set('isSearching', true);
        var result = this.content.filter(function(artist) {
          return artist.toUpperCase().indexOf(searchPhrase) !== -1;
        });
        this.set('displayContent', result);
      }
    },
  }
});


})();

(function() {

App.DropboxController = Em.ArrayController.extend({
  needs: ['application', 'whitelist'],
  nextPath: 'import',
  status: null,
});


})();

(function() {

App.LandingController = Em.Controller.extend({
  nextPath: 'dropbox',
});


})();

(function() {

App.NavController = Em.Controller.extend({
  needs: ['dropbox', 'import', 'traktor', 'push'],
});


})();

(function() {

App.TraktorController = Em.Controller.extend({
  nextPath: 'push',
  status: null
});


})();