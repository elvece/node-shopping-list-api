// add scripts

$(document).on('ready', function() {
  $('#success-message').hide();
  $('#error-message').hide();
});

$('form').on('submit', function(event){
  event.preventDefault();
  $('#item-name').val();

});
