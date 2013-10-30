App.AdjustMessagesView = Em.View.extend({
  controller: 'import',
  didInsertElement: function() {
    
    // after the whitelist is removed, reposition the messages
    Em.$('#messages').css('margin-top', '0px');
  }
});
