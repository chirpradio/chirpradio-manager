module('integration tests', {
  setup: function() {
    App.reset();
  }
});

test('landing page displays instructions', function() {
  Ember.run(App, 'advanceReadiness');
  visit('landing').then(function() {
    equal(find('#instructions li').length, 4, 'there are 4 instructions on the page');
    equal(find('.nav li').length, 6, 'the navigation menu displays correctly');
  });
});

test('dropbox displays album and tracks correctly', function() {
   
  // patch route data
  stubData('dropbox', testAlbum);
 
  visit('dropbox').then(function() {
    
    // test album details
    equal(find('.album-title').text(), 'A Ghost Is Born', 'album title displays correctly');
    equal(find('.artist').text(), 'Wilco', 'album title displays correctly');

    // test navigation
    exists('i[class$="icon-ok"]', 'navigation shows success')
  }).then(function() {

    // open track detail
    click('.icon-arrow-right').then(function() {
      equal(find('.track').length, 12, 'number of tracks');
    }).then(function() {

      // close track detail
      click('.icon-arrow-down').then(function() {
        equal(find('.track').length, 0, 'number of tracks');
      });
    });
  });
});

test('dropbox displays album correctly and freezes next button when error', function() {
 
  // patch route data 
  stubData('dropbox', testAlbumError);

  visit('dropbox').then(function() {
    
    // test album details
    equal(find('.album-title').text(), 'A Ghost Is Born', 'album title displays correctly');
    equal(find('.artist').text(), 'Wilco', 'album title displays correctly');
    exists('tr[class="album error"]', 'album shows error');

    // test navigation
    exists('i[class$="icon-remove"]', 'navigation error shows');
    exists('button:contains("Next Step"):disabled', 'navigation button is disabled');

  }).then(function() {
    click('.remove').then(function() {

      // album has been removed from dropbox
      equal(find('.album-title').text().length, 0, 'album artist is not displayed');
      equal(find('.artist').text().length, 0, 'album title is not displayed');
     
      // test navigation
      exists('i[class$="icon-ok"]', 'navigation shows success');
      equal(find('button:contains("Next Step"):disabled').length, 0, 'navigation button is enabled');
    });
  });
});

test('import route', function() {
  visit('import').then(function() {
    exists('li[class$="success-message"]', 'success message is displayed')
  });
});
