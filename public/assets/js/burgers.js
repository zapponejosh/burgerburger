$(document).ready(() => {
  function fail() {
    alert('Failed request');
  }

  function success() {
    location.reload();
  }

  // To devour or remake burger
  $('.burger').on('click', function (event) {
    const id = $(this).data('id');

    console.log(id);
    $.ajax(`/api/burgers/${id}`, {
      method: 'PUT',
      statusCode: {
        200: () => success(),
        404: () => fail(),
      },
    });
  });

  $('#create-burger').submit((event) => {
    console.log('Sub');
    event.preventDefault();
    const burgerName = $('#newBurger').val().trim();
    console.log(burgerName);
    if (burgerName) {
      $.ajax('/api/burgers', {
        method: 'POST',
        data: { burger: burgerName },
        statusCode: {
          200: () => success(),
          404: () => fail(),
        },
      });
    }
  });

  $('.remove').on('click', function (event) {
    const id = $(this).data('id');
    console.log(id);
    $.ajax(`/api/burgers/delete/${id}`, {
      method: 'DELETE',
      statusCode: {
        200: () => success(),
        404: () => fail(),
      },
    });
  });
});
