var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.content}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a  = $(`<a target="_blank">My Location</a>`);
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  $('#messages').append(li.append(a));
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    content: $('[name="message"]').val()
  }, function () {

  });

});

var locationButton = $('#send-location');

locationButton.on('click', function (e) {
  if (!navigator.geolocation) return alter('Browser does not support geolocation');

  navigator.geolocation.getCurrentPosition(function (postion) {
      var latitude  = postion.coords.latitude;
      var longitude = postion.coords.longitude;
      socket.emit('createLocationMessage', {latitude: latitude, longitude: longitude});
  }, function () {
    alert('Unable to get location');
  });
});
