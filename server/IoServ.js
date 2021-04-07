const express = require('express');
const app = express()
const server = require('http').Server(app)

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const users = {}

let rooms = []


server.listen(3000)

io.on('connection', socket => {

  socket.emit('rooms', rooms)

  socket.on('new-user', ({ nickname, id }) => {
    socket.join(id)
    users[socket.id] = nickname
    socket.to(id).emit('user-connected', nickname)
  })

  socket.on('new-room', () => {
    const lastId = rooms.length === 0 ? 0 : rooms[rooms.length - 1].id + 1
    rooms.push({
      name: `room${lastId}`,
      id: lastId
    })
    socket.emit('join-created-room', lastId)
    io.emit('rooms', rooms)
  })

  socket.on('send-chat-message', ({ message, id }) => {
    socket.to(id).emit('chat-message', { message: message, nickname: users[socket.id] })
  })

  socket.on('disconnecting', () => {
    const socketRooms = socket.rooms
    for (room of socketRooms)
      socket.to(room).emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  });
})

