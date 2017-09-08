var socket = io();

var locationButton = $('#send-location');

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-of-type');
  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var messageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + messageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No errors');
    }
  });
});
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ul = $('<ul></ul>');

  users.forEach(function (user) {
    ul.append($('<li></li>').text(user));
  });

  $('#users').html(ul);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var {content, from} = message;
  var html = Mustache.render(template, {content, from, createdAt: formattedTime});

  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var {from, url} = message;
  var html = Mustache.render(template, {from, url, createdAt: formattedTime});

  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    content: $('[name="message"]').val()
  }, function () {
    $('[name="message"]').val('');
  });

});

locationButton.on('click', function (e) {
  if (!navigator.geolocation) return alter('Browser does not support geolocation');

  locationButton.attr('disabled', 'disabled').text('Fetching location...');
  navigator.geolocation.getCurrentPosition(function (postion) {
    var latitude  = postion.coords.latitude;
    var longitude = postion.coords.longitude;
    socket.emit('createLocationMessage', {latitude: latitude, longitude: longitude});
    locationButton.removeAttr('disabled').text('Send location');
  }, function () {
    locationButton.removeAttr('disabled');
    alert('Unable to get location');
  });
});
