const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'jack',
    content: 'What are you up to?',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});


server.listen(port, () => {
  console.log('listening on port', port);
});
