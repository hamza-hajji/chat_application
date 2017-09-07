var socket = io();

var locationButton = $('#send-location');

socket.on('connect', function () {
  console.log('connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var {content, from} = message;
  var html = Mustache.render(template, {content, from, createdAt: formattedTime});

  $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var {from, url} = message;
  var html = Mustache.render(template, {from, url, createdAt: formattedTime});

  $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
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
