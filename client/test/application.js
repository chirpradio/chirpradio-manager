(function() {


// require compiled templates


})();

(function() {

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "whitelist", options) : helperMissing.call(depth0, "render", "whitelist", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

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
  stack2 = helpers['if'].call(depth0, "showWhitelist", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.render || depth0.render),stack1 ? stack1.call(depth0, "messages", options) : helperMissing.call(depth0, "render", "messages", options))));
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
  data.buffer.push("</td>\n    ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "error", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n  </tr>\n  ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "view.open", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n      ");
  hashContexts = {'contentBinding': depth0};
  hashTypes = {'contentBinding': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.RemoveView", {hash:{
    'contentBinding': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n    <td class=\"end\"></td>\n    ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['with'].call(depth0, "artist", "as", "artist", {hash:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "tracks", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  return buffer;
  }
function program9(depth0,data) {
  
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
  


  data.buffer.push("<h3>Instructions</h1>\n<ol id=\"instructions\">\n  <li>\n    <p>This step will show the albums in the dropbox. Carefully proofread the album information. Artist, album and track names can be edited by double clicking on them. Artist names that are not already in the music library will be highlighted in yellow. You \n      should use the search bar on the right to make sure the artist's name is spelled correctly. If an error occurs, the album will be highlighted in red and an X will appear next to the album title. Click the X to move the album from the dropbox to the \n      needs fixing folder. Albums with errors must be removed to proceed.</p>\n  </li>\n  <li>\n    <p>This step will import the albums in the dropbox into the Chirp Library. It may take a while to run. If any albums produce errors, they should be removed by pressing the X. Albums with errors must be removed to continue.</p>\n  </li>\n  <li>\n    <p>This step will create a file named new-collection.nml in the Traktor root directory. At this point Traktor can be switched over to the new collection whereby you shut down Traktor, rename new-collection.nml to collection.nml and restart Traktor</p>\n  </li>\n  <li>\n    <p>This step will upload the artist, album and track info to the DJ Database.</p>\n  </li>\n</ol>\n<!--Preload font library-->\n<i style=\"visibility:hidden;\" class=\"icon-spinner icon-spin\"></i>\n");
  
});

Ember.TEMPLATES["messages"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashContexts, hashTypes;
  data.buffer.push("\n  ");
  hashContexts = {'contentBinding': depth0};
  hashTypes = {'contentBinding': "ID"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MessageView", {hash:{
    'contentBinding': ("")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push("<ul id=\"messages\">\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "controller", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
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
    'resource': ("generate")
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

// create App
window.App = Em.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#importer'
});
if (window.TESTING) {
  window.App.deferReadiness();
}

// require routes, views and controllers


})();

(function() {

App.ApplicationRoute = Em.Route.extend({

  activate: function() {

    // TODO move and implement start and stop calls

    // poll for messages every 3 secondes and push them to the UI
    var messagesController = this.controllerFor('messages');
    function poll() {
      Em.$.getJSON('/messages', function(response) {
        
        // push mesages to ui
        messagesController.unshiftObjects(response);
      });
    }
    
    // poll every 5 seconds
    setInterval(poll, 3000);
  }
});


})();

(function() {

App.DropboxRoute = Em.Route.extend({
  model: function() {
    
    // periodic import
    return Em.$.getJSON('/scan_dropbox');
  },
  beforeModel: function(transition) {
    
    var self = this;
    
    // return promise to delay model loading 
    //return Em.$.getJSON('/current_route', function(response) {
     
      // call home to make sure the client is on the same step as the server
     // if (transition.targetName === response.route_name) {

        // set loading status to true before data is ready
        self.controllerFor('dropbox').set('working', true);

      //} else {

        // abort and transition to the correct route
       // self.transitionTo(response.route_name);
     // }

   // });

  },
  afterModel: function() {
  
    // set loading status to true before data is ready
    this.controllerFor('dropbox').set('working', false);

  },
  setupController: function(controller, model) {
     
    var self = this;
       
    // load whitelist
    Em.$.getJSON('/whitelist', function(response) {
      self.controllerFor('whitelist').set('model', response);
      self.controllerFor('application').set('showWhitelist', true);
    });

    // no albums in dropbox
    if (model.length === 0) {
      controller.set('working', null);
    }

    controller.set('model', model);
  }
});


})();

(function() {

App.GenerateRoute = Em.Route.extend({
  model: function() {

    // generate nml file
    return Em.$.getJSON('/generate');
  },
  beforeModel: function(transition) {

    var self = this;
    
    // return promise to delay model loading 
    return Em.$.getJSON('/current_route', function(response) {
      
      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {

        // make sure previous routes are marked done
        self.controllerFor('dropbox').set('working', false);
        self.controllerFor('import').set('working', false);

        // set loading status to true before data is ready
        self.controllerFor('generate').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name);
      }
    });

  },
  afterModel: function() {
  
    // set loading status to true before data is ready
    this.controllerFor('generate').set('working', false);

    // hide whitelist
    this.controllerFor('application').set('showWhitelist', false);

  },
  renderTemplate: function() {

    // use dropbox template and import controller
    this.render('dropbox', {
      controller: 'import'
    });
  }
});


})();

(function() {

App.ImportRoute = Em.Route.extend({
  model: function() {

    // periodic import
    return Em.$.getJSON('/import_albums');
  },
  setupController: function(controller, model) {

    // TODO git add and push, server?
    controller.set('model', model);
     
  },
  beforeModel: function(transition) {

    var self = this;

    // return promise to delay model loading
    return Em.$.getJSON('/current_route', function(response) {

      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {

        // make sure previous route is marked done
        self.controllerFor('dropbox').set('working', false);

        // set loading status to true before data is ready
        self.controllerFor('import').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name)
      }

    });
  },
  afterModel: function() {

    // set loading status to true before data is ready
    this.controllerFor('import').set('working', false);
    
    // hide whitelist search    
    this.controllerFor('application').set('showWhitelist', false);

    // grab remaining messages from server
    var messagesController = this.controllerFor('messages');
    Em.$.getJSON('/messages', function(response) {
      messagesController.unshiftObjects(response);
    });

  },
  renderTemplate: function(controller) {

    // use the dropbox template
    this.render('dropbox', {
      controller: controller
    });

    // adjust message position when loaded
    var view = App.AdjustMessagesView.create();
    view.append();
  }
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

App.PushRoute = Em.Route.extend({
  model: function() {

    // generate nml file
    return Em.$.getJSON('/push');
  },
  beforeModel: function(transition) {

    var self = this;
    
    // return promise to delay model loading 
    return Em.$.getJSON('/current_route', function(response) {
      
      // call home to make sure the client is on the same step as the server
      if (transition.targetName === response.route_name) {

        // make sure previous routes are marked done
        self.controllerFor('dropbox').set('working', false);
        self.controllerFor('import').set('working', false);
        self.controllerFor('generate').set('working', false);

        // set loading status to true before data is ready
        self.controllerFor('push').set('working', true);

      } else {

        // abort and transition to the correct route
        self.transitionTo(response.route_name);
      }
    });

  },
  afterModel: function() {
  
    // set loading status to true before data is ready
    this.controllerFor('push').set('working', false);

    // hide whitelist
    this.controllerFor('application').set('showWhitelist', false);

  },
  renderTemplate: function() {

    // use dropbox template and import controller
    this.render('dropbox', {
      controller: 'import'
    });
  }
});


})();

(function() {

App.Router.map(function() {
  this.route('landing');
  this.route('dropbox');
  this.route('import');
  this.route('generate');
  this.route('push');
  this.route('success');
});


})();

(function() {

App.AdjustMessagesView = Em.View.extend({
  controller: 'import',
  didInsertElement: function() {
    
    // after the whitelist is removed, reposition the messages
    Em.$('#messages').css('margin-top', '0px');
  }
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

App.RemoveView = Em.View.extend({
  tagName: 'td',
  classNames: ['remove'],
  template: Em.Handlebars.compile('✕'),
  click: function() {
     
    var content = this.get('content');
    var albumPath = content.path
    var controller = this.get('controller');
    
    $.ajax({
      url: '/remove_album',
      type: 'POST',
      data: {path: JSON.stringify(albumPath)},
      success: function(response) {
       
        // explicit run for debugging 
        Em.run(function() {

          if (response.success)

            // remove album from array
            controller.removeObject(content);

            // if all errors are gone
            if (!(controller.get('status') === 'error')) {

              // clear messages
              controller.get('controllers.messages.content').clear();

              controller.set('working', true);

              // reload the current route
              Em.$.getJSON('/import_albums', function() {

                // finished loading
                controller.set('working', false);
              });
            }
        });
      }
    })
  }
})


})();

(function() {

App.MessageView = Em.View.extend({
  tagName: 'li',
  template: Em.Handlebars.compile('{{{message}}}'),
  classNameBindings: ['messageStatus'],
  messageStatus: function() {
    var messageStatus = this.get('content.status');
    if (messageStatus === 'success') {
      return 'success-message';
    } else if (messageStatus === 'warning') {
      return 'warning-message';
    } else if (messageStatus === 'error') {
      return 'error-message';
    }
  }.property()
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


})();

(function() {

App.WhitelistView = Em.View.extend({
   input: function() {
     this.get('controller').send('query');
   }
});


})();

(function() {

App.ApplicationController = Em.Controller.extend({
  needs: ['landing', 'dropbox', 'import', 'generate', 'push'],
  showWhitelist: null,
  actions: { 
    next: function() {
      // transition to the next route
      this.transitionToRoute(this.get('controllers.'+this.get('currentRouteName')).nextPath);
    },
  },
});


})();

(function() {

// TODO make mixin

App.DropboxController = Em.ArrayController.extend({
  needs: ['application'],
  nextPath: 'import',

  // will return 'error' if an album with an error is present.
  status: function() {

    if (this.findBy('error', true)) {
      return 'error';
    } else if (this.get('working')) {
      return 'working';
    } else if (this.get('working') === false) {
      return 'done';
    } else {
      return null;
    }

  }.property('content.@each.error', 'working'),
  working: null,
});


})();

(function() {

App.GenerateController = Em.Controller.extend({
  //needs: ['application', 'messages'],
  nextPath: 'push',
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


})();

(function() {

App.ImportController = Em.ArrayController.extend({
  needs: ['application', 'messages'],
  nextPath: 'generate',
  // will return 'error' if an album with an error is present.
  status: function() {

    if (this.findBy('error', true)) {
      return 'error';
    } else if (this.get('working')) {
      return 'working';
    } else if (this.get('working') === false) {
      return 'done';
    } else {
      return null;
    }

  }.property('content.@each.error', 'working'),
  working: null,
});


})();

(function() {

App.LandingController = Em.Controller.extend({
  nextPath: 'dropbox',
});


})();

(function() {

App.MessagesController = Em.ArrayController.extend();


})();

(function() {

App.NavController = Em.Controller.extend({
  needs: ['dropbox', 'import', 'generate', 'push'],
  error: function() {
    return this.get('controllers.dropbox.status') === 'error'
        || this.get('controllers.import.status') === 'error'
        || this.get('controllers.generate.status') === 'error'
        || this.get('controllers.push.status');
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'
           , 'controllers.generate.status'
           , 'controllers.push.status'),
  working: function() {
    return this.get('controllers.dropbox.status') === 'working'
        || this.get('controllers.import.status') === 'working'
        || this.get('controllers.generate.status') === 'working'
        || this.get('controllers.push.status');
  }.property('controllers.dropbox.status'
           , 'controllers.import.status'
           , 'controllers.generate.status'
           , 'controllers.push.status')
});


})();

(function() {

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