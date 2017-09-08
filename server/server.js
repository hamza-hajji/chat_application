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

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isValidString} = require('./utils/validator');
var {Users} = require('./utils/users');

var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join', (params, callback) => {
    if (!isValidString(params.name) || !isValidString(params.room))
      return callback('Name and Room are required');

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat Application!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has just joined!`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Create Message', message);
    var {from, content} = message;
    io.emit('newMessage', generateMessage(from, content));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has just left`));
    }
  });
});


server.listen(port, () => {
  console.log('listening on port', port);
});
