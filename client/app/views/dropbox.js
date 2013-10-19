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
