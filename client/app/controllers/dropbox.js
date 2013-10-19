App.DropboxController = Em.ArrayController.extend({
  needs: ['application', 'whitelist'],
  nextPath: 'import',
  status: null,
});
