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
