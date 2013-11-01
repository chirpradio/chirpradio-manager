App.AlbumView = Em.View.extend({
  open: false,
});

App.ToggleView = Em.View.extend({
  tagName: 'i',
  classNameBindings: ['toggle'],
  click: function() {

    // open property of album
    var open = this.get('parentView.open');

    // close each album
    this.get('parentView.parentView.childViews').forEach(function(albumView) {
      albumView.set('open', false);
    });

    // set album to opposite of open
    if (!open) this.set('parentView.open', !this.get('parentView.open'));

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
     
    var content = this.get('content'),
        controller = this.get('controller'),
        albumPath = this.get('content.path');
    
    $.ajax({
      url: '/remove_album',
      type: 'POST',
      data: {
        path: JSON.stringify(albumPath)
      },
      success: function(response) {
       
        // explicit run for testing
        Em.run(function() {

          if (response.success) {

            // remove album from array
            controller.removeObject(content);

            // if all errors are gone
            if (!(controller.get('status') === 'error')) {

              // clear messages
              controller.get('controllers.messages.content').clear();

              // set working status, activate spinner
              controller.set('working', true);

              // reload the current route
              // TODO should not hardcode resource
              // TODO should set content
              Em.$.getJSON('/import_albums', function() {

                // set working status, deactivate spinner
                controller.set('working', false);
              });
            }
          }
        });
      }
    })
  }
})
