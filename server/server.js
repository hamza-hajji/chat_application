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

  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
    io.emit('newMessage', {
      from: message.from,
      content: message.content,
      createdAt: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});


server.listen(port, () => {
  console.log('listening on port', port);
});
