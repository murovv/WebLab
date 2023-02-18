$(function() {
  $('td').click(function() {
    $('tr').removeClass('active');
    $(this).parent().addClass('active');
  });
});
