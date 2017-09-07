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

var {generateMessage} = require('./utils/message');

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat Application!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  socket.on('createMessage', (message) => {
    console.log('Create Message', message);
    var {from, content} = message;
    io.emit('newMessage', generateMessage(from, content));
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});


server.listen(port, () => {
  console.log('listening on port', port);
});
