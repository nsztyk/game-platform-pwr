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

const addUserToRoom = (roomId, nickname) => {
  rooms = rooms.map( room => {
    if (room.id == roomId)
      room.users.push(nickname)
    return room
  })
}

const deleteUserFromRooms = (roomsId, nickname) => {
  rooms = rooms.map( room => {
    if (roomsId.includes(room.id.toString())){
      room.users = room.users.filter(user => user != nickname)
    }
    return room
  }) 
}

server.listen(3000)

io.on('connection', socket => {

  socket.emit('rooms', rooms)

  socket.on('new-user', ({ nickname, id }) => {
    socket.join(id)
    users[socket.id] = nickname
    addUserToRoom(id, nickname)
    socket.to(id).emit('user-connected', nickname)
    io.emit('rooms', rooms)
  })

  socket.on('new-room', () => {
    const lastId = rooms.length === 0 ? 0 : rooms[rooms.length - 1].id + 1
    rooms.push({
      name: `room${lastId}`,
      id: lastId,
      users: []
    })
    socket.emit('join-created-room', lastId)
    io.emit('rooms', rooms)
  })

  socket.on('send-chat-message', ({ message, id }) => {
    socket.to(id).emit('chat-message', { message: message, nickname: users[socket.id] })
  })

  socket.on('disconnecting', () => {
    const socketRooms = socket.rooms
    deleteUserFromRooms(Array.from(socketRooms), users[socket.id])
    for (socketRoom of socketRooms) {
      socket.to(socketRoom).emit('user-disconnected', users[socket.id])
      const roomInfo = io.sockets.adapter.rooms.get(socketRoom)
      if (roomInfo.size === 1)
        rooms = rooms.filter( room => room.id != socketRoom )
    }
    delete users[socket.id]
    io.emit('rooms', rooms)
  });
})

