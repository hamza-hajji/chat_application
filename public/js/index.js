var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
  socket.emit('createMessage', {
    from: 'janine',
    content: 'Is there anybody in there?'
  });
});
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message!', message);
});
