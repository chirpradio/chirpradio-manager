// Application

App = Em.Application.create({
  LOG_TRANSITIONS: true,
});

App.Router.map(function() {
  this.route('landing');
  this.route('dropbox');
  this.route('import');
  this.route('generate');
  this.route('push');
  this.route('success');
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('landing');
  }
});

// Route Mixin

App.RouteMixin = Em.Mixin.create({
  model: function() {
    return App.Album.all(this.resource);
  },
  activate: function() {
    this.controllerFor(this.resource).set('loading', true);
  },
  deactivate: function() {
    this.controllerFor('application').set('loaded', false);
    console.log('clearing messages');
    this.controllerFor('messages').clear();
  },
  setupController: function(controller, model) {
    var self = this;
    model.then(function(data) {
      // extract the messages
      var messages = Em.A();
      data.forEach(function(album) {
        messages.addObjects(album.messages);
      });
      self.controllerFor('messages').send('addMessages', messages);

      self.controllerFor('application').set('loaded', true);
      controller.set('content', data);
      
      controller.set('loading', false);
      controller.set('loaded', true);
    });
  }
});

// Routes

App.LandingRoute = Em.Route.extend({
  activate: function() {
    this.controllerFor('application').set('loaded', true);
  },
  deactivate: function() {
    this.controllerFor('application').set('loaded', false);
  }
});

App.DropboxRoute = Em.Route.extend(App.RouteMixin, {
  resource: 'dropbox',
  renderTemplate: function() {
    this.render('albums');
  },
  setupController: function(controller, model) {
    this._super(controller, model);

    // load whitelist
    var whitelist = Em.A();
    var self = this;
    $.getJSON('whitelist', function(response) {
      response.whitelist.forEach(function(name) {
        whitelist.push(Em.Object.create({
          name: name,
          nameUpper: name.toUpperCase()
        }));
      });
      self.controllerFor('application').set('whitelist', true);
    });
    this.controllerFor('whitelist').set('content', whitelist);
  },
  deactivate: function() {
    //this.controllerFor('messages').send('getMessages', 'update_whitelist');
    this._super();
  }
});

App.ImportRoute = Em.Route.extend(App.RouteMixin, {
  resource: 'import',
  renderTemplate: function() {
    this.render('albums');
  },
  activate: function() {
    this._super();
    this.controllerFor('application').set('whitelist', false);
  }
});

App.GenerateRoute = Em.Route.extend({
  resource: 'generate',
  renderTemplate: function() {
    this.render('albums', {
      controller: 'import'
    });
  },
  deactivate: function() {
    this.controllerFor('application').set('loaded', false);
  },
  setupController: function(controller, model) {
    controller.set('state', 'working');
    var errorStatus = this.controllerFor('messages').getMessages(this.resource);
    var self = this;
    errorStatus.then(function(error) {
      self.controllerFor('application').set('loaded', true);
      if (error.messages.filterProperty('status') === 'error') {
          controller.set('state', 'error');
      } else {
          controller.set('state', 'done');
      }
    });
  }
});

App.PushRoute = Em.Route.extend({
  resource: 'push',
  renderTemplate: function() {
    this.render('albums', {
      controller: 'import'
    });
  },
  deactivate: function() {
    this.controllerFor('application').set('loaded', false);
  },
  setupController: function(controller, model) {
    controller.set('state', 'working');
    var errorStatus = this.controllerFor('messages').getMessages(this.resource);
    var self = this;
    errorStatus.then(function(error) {
      self.controllerFor('application').set('loaded', true);
      if (error.messages.filterProperty('status') === 'error') {
          controller.set('state', 'error');
      } else {
          controller.set('state', 'done');
      }
    });
  }
});

// Controller Mixin

App.AlbumsControllerMixin = Em.Mixin.create({
  loading: false, 
  loaded: false,
  state: function() {
    var errors = this.findProperty('status', 'error');
    if (this.findProperty('status', 'error')) {
      return 'error';
    } else if (this.get('loading')) {
      return 'working';
    } else if (this.get('loaded')) {
      return 'done';
    }
  }.property('@each.status', 'loading', 'loaded'),

  toggle: function(album) {
    var isOpen = !album.get('isOpen');
    this.get('content').forEach(function(album) {
       album.set('isOpen', false);
    });
    album.set('isOpen', isOpen);
  },

  update: function(album) {
    $.ajax({
      url: 'update',
      type: 'PUT',
      data: {data: JSON.stringify(album)}
    });
    if (this.get('controllers.whitelist').artistExists(album.get('artist'))) {
      album.set('status', 'success');
      album.set('message', null);
    } else {
      album.set('status', 'warning');
      album.set('message', 'new artist name');
    }
  },

  move: function(album) {
    var self = this;
    $.ajax({
      url: 'move',
      type: 'PUT',
      data: {data: JSON.stringify(album.get('path'))},
      success: function(response) {
        self.get('controllers.messages').send('addMessages', response.messages);
        console.log(response);
        var err = response.messages.filterProperty('status', 'error');
        console.log(err);
        console.log(err.length);
        if (err.length == 0) {
          console.log('remove')
          self.removeObject(album);
        }
        var errs = self.filterProperty('status', 'error');
        if (errs.length == 0) {
          self.transitionToRoute('dropbox');
          self.set('loaded', false);
        }
      }
    });
  }
});


// Controllers 

App.ApplicationController = Em.Controller.extend({
  loaded: false,
  disabled: function() {
    var dropboxStat = this.get('controllers.dropbox.state')
    var importStat = this.get('controllers.import.state')
    var generateStat = this.get('controllers.generate.state')
    var pushStat = this.get('controllers.push.state')
    return dropboxStat === 'working' || dropboxStat === 'error' ||
           importStat === 'working' || importStat === 'error' ||
           generateStat === 'working' || generateStat === 'error' ||
           pushStat === 'working' || pushStat === 'error';
  }.property('controllers.dropbox.state', 'controllers.import.state', 
             'controllers.generate.state', 'controllers.push.state'),
  needs: ['landing', 'dropbox', 'import', 'generate', 'push'],
  next: function() {
    var path = this.get('currentPath');
    var nextPath = this.get('controllers').get(path).get('nextPath');
    if (nextPath) {
      this.transitionToRoute(nextPath);
    }
  }
});

App.LandingController = Em.Controller.extend({
  status: 'done',
  nextPath: 'dropbox',
});

App.DropboxController = Em.ArrayController.extend(App.AlbumsControllerMixin, {
  editable: true,
  needs: ['whitelist', 'messages'],
  nextPath: 'import',
  status: null
})

App.ImportController = Em.ArrayController.extend(App.AlbumsControllerMixin, {
  needs: ['messages'],
  nextPath: 'generate',
  status: null
})

App.GenerateController = Em.Controller.extend({
  nextPath: 'push',
  status: null,
})

App.PushController = Em.Controller.extend({
  nextPath: 'success',
  status: null
})

App.WhitelistController = Em.ArrayController.extend({
  isSearching: false,
  displayContent: Em.A(),
  
  query: function() {
    // TODO split to search on individual words
    var searchWord = this.get('searchWord').toUpperCase();
    if (searchWord.length < 2) {
      this.set('isSearching', false);
      return
    } else {
      this.set('isSearching', true);
    }
    var result = this.content.filter(function(item) {
      return item.nameUpper.indexOf(searchWord) !== -1;
    });
    this.set('displayContent', result);
  },

  artistExists: function(name) {
    return this.content.findProperty('nameUpper', name.toUpperCase());
  }
});

//App.MessagesController = Em.ArrayController.extend({
//  addMessages: function(messages) {
//  }
//});

// Views

App.RouteStatus = Em.View.extend({
  template: Em.Handlebars.compile('{{view.status}}'),
  status: function() {
    var status = this.get('controller.state');
    if (status === 'working') {
      return Em.String.htmlSafe('<i class="icon-spinner icon-spin"></i>');
    } else if (status === 'done') {
      return Em.String.htmlSafe('<i class="icon-ok"></i>');
    }
  }.property('controller.state'),
});


App.AlbumView = Em.View.extend({
  templateName: 'album',
});

App.EditView = Em.View.extend({
  templateName: 'editing',
  isEditing: false,
  update: function(context) {
    if (context.toString().indexOf('Album') !== -1) {
      var album = context;
    } else {
      var album = this.get('controller').findProperty('id', context.get('albumId'));
    }
    this.get('controller').send('update', album);
    this.set('isEditing', false);
  },
  doubleClick: function() {
    if (this.get('controller.editable')) {
      this.set('isEditing', true);
    }
  },
  focusOut: function() {
    this.update(this.get('context'));
  },
  keyUp: function(evt) {
    if (evt.keyCode == 13) {
      this.update(this.get('context'));
    }
  }
});

App.EditField = Em.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

App.WhitelistView = Em.View.extend({
  input: function() {
    this.get('controller').send('query');
  }
});
