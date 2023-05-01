const notif = {
  renderMessage(type, message) {
    console.log(type);
    const className = type == 'success' ? '<article class="message is-success">' : '<article class="message is-danger">';
    const title = type == 'success' ? 'Успех' : 'Ошибка';
    return className +
        '<div class="message-header">' +
        '<p>' + title + '</p>' +
        '</div>' +
        '<div class="message-body">' + message + '</div>' +
        '</article>';
  },

  show(type, message) {
    const renderedMessage = this.renderMessage(type, message);
    $('#messsage_container').html(renderedMessage).fadeIn('slow', function() {
      $(this).delay(1000).fadeOut('slow');
    });
  },
};


