const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('JOIN_ROOM', (room) => {
    socket.join(room);
  });

  socket.on('CHANGE_CLIENT', (data) => {
    socket.broadcast.to(data.room).emit('CHANGE_SERVER', data.code)  
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});