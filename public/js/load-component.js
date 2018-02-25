$(function () {
  $('#login').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('href'),
      method: 'GET',
      cache: false,
      data: {
        type: 1
      },
      success: function (data) {
        $('body').prepend(data);
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });
})