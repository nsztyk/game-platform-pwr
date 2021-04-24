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
  rooms = rooms.map(room => {
    if (room.id == roomId)
      room.users.push(nickname)
    return room
  })
}

const deleteEmptyRooms = () => {
  rooms = rooms.filter(room => room.users.length)
}

const deleteUserFromRooms = (roomsId, nickname) => {
  rooms = rooms.map(room => {
    if (roomsId.includes(room.id)) {
      room.users = room.users.filter(user => user != nickname)
      // pass admin
      room.admin = room.users[0]
    }
    return room
  })
}

const isPlayerAdminInRoom = (nickname, roomId) => {
  room = rooms.filter(room => room.id == roomId)[0]
  return (room && room.admin == nickname)
}

const getPlayers = () => {
  return Object.values(users)
}

const getRoomWithId = (roomId) => {
  return rooms.filter(room => room.id == roomId)[0]
}


server.listen(3000)

io.on('connection', socket => {

  const handleDisconnecting = () => {
    const socketRooms = socket.rooms
    deleteUserFromRooms(Array.from(socketRooms), users[socket.id])
    for (socketRoom of socketRooms) {
      socket.to(socketRoom).emit('user-disconnected', users[socket.id])
    }
    deleteEmptyRooms()
    delete users[socket.id]
    io.emit('rooms', rooms)
    io.emit('connected-players', getPlayers())
  }

  socket.emit('rooms', rooms)

  socket.on('get-rooms', () => {
    socket.emit('rooms', rooms)
  })

  socket.on('register-user-on-server', nickname => {
    users[socket.id] = nickname
    io.emit('connected-players', getPlayers())
  })

  socket.on('join-room', (id) => {
    socket.join(id)
    addUserToRoom(id, users[socket.id])
    socket.to(id).emit('user-connected', users[socket.id])
    io.emit('rooms', rooms)
  })

  socket.on('new-room', () => {
    const lastId = rooms.length === 0 ? 0 : rooms[rooms.length - 1].id + 1
    rooms.push({
      name: `room${lastId}`,
      id: lastId,
      users: [],
      admin: users[socket.id],
      game: undefined
    })
    socket.emit('join-created-room', lastId)
    io.emit('rooms', rooms)
  })

  socket.on('send-chat-message', ({ message, id }) => {
    socket.to(id).emit('chat-message', { message: message, nickname: users[socket.id] })
  })

  socket.on('disconnecting', () => handleDisconnecting());

  socket.on('routeChange', () => handleDisconnecting());

  /*

   GAMES
  
  */
  socket.on('chosen-game', ({ selectedGame, id }) => {
    if (isPlayerAdminInRoom(users[socket.id], id)) {
      const room = getRoomWithId(id)
      room.game = selectedGame
      initGameInRoom(room)
    }
  })

  const initGameInRoom = (room) => {
    io.to(room.id).emit('chat-message', { message: `Game in ${room.game} started!`, nickname: 'system' })
  }





})

