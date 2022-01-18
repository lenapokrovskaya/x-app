const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require("./routes/auth.routes")
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser:true,
      useUnifiedTopology:true
  })
    app.listen(PORT, () => {
      console.log('Server started on port', PORT)
    })
  } catch (e) {
     console.log("Не работает((")
  } 
}



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

start();