$(function() {
  $.ajaxSetup({
    error: function(jqXHR, exception) {
      if (jqXHR.status === 0) {
        alert('No connection.\n Verify Network.');
      } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].\n');
      } else {
        alert('Uncaught Error.\n' + jqXHR.responseText);
      }
    }
  });
});
