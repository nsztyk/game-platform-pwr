const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const env = require('./config/keys');


const app = express();
const server = require('http').Server(app)

const port = process.env.PORT || 5000

// Middleware
app.use(express.json());
app.use(cors())


// Setting routes
const usersAPI = require('./routes/api/users')
app.use('/api/users/', usersAPI)


// Connecting to db
mongoose.connect(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => appListen())
  .catch((err) => console.log(err))

const appListen = () => {
  server.listen(port, () => console.log(`Server running on port ${port}`))
}

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const users = {}

let rooms = []

const roomDetails = {}

const gameSecret = {}

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
    socket.to(id).emit('user-connected', users[socket.id])
    addUserToRoom(id, users[socket.id])
    const room = getRoomWithId(id)
    if (room.game) {
      socket.emit('initalize-game-client', { game: room.game, gameDetails: roomDetails[room.id] })
      socket.emit('curr-game-info', roomDetails[room.id])
    }
    io.emit('rooms', rooms)
  })

  socket.on('new-room', () => {
    const lastId = rooms.length === 0 ? 0 : rooms[rooms.length - 1].id + 1
    rooms.push({
      name: `room${lastId}`,
      id: lastId,
      users: [],
      players: [],
      admin: users[socket.id],
      game: undefined,
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

  const { tictactoeStartingState, tictactoeMakeMove, tictactoeMaxPlayers, tictactoeMinPlayers } = require('./games/tictactoe');
  const { rpslsMaxPlayers, rpslsMinPlayers, rpslsStartingState, rpslsMakeMove, rpslsGetWinner } = require('./games/rpsls');


  socket.on('chosen-game', ({ selectedGame, id }) => {
    if (isPlayerAdminInRoom(users[socket.id], id)) {
      const room = getRoomWithId(id)
      // TODO Check if game is avaliable
      room.game = selectedGame
      initGameInRoom(room)
    }
  })

  const initGameInRoom = (room) => {
    roomDetails[room.id] = { playersMoveOrder: [], gameState: [], result: {}, minPlayers: null, maxPlayers: null, gameStarted: false, players: [] }
    switch (room.game) {
      case 'Tictactoe':
        roomDetails[room.id].gameState = tictactoeStartingState()
        roomDetails[room.id].maxPlayers = tictactoeMaxPlayers
        roomDetails[room.id].minPlayers = tictactoeMinPlayers
        roomDetails[room.id].players = new Array(tictactoeMaxPlayers).fill(null)
        break;
      case 'Rpsls':
        roomDetails[room.id].maxPlayers = rpslsMaxPlayers
        roomDetails[room.id].minPlayers = rpslsMinPlayers
        roomDetails[room.id].players = new Array(rpslsMaxPlayers).fill(null)
        break;
      default:
        break;
    }
    io.to(room.id).emit('rooms', rooms)
    io.to(room.id).emit('initalize-game-client', { game: room.game, gameDetails: roomDetails[room.id] })
  }

  socket.on('add-player-to-game', ({ roomId, position }) => {
    const game = roomDetails[roomId]
    if (!game.players[position]) {
      game.players = game.players.map(player => {
        if (player != users[socket.id])
          return player
        return null
      })
      game.players[position] = users[socket.id]
      io.to(roomId).emit('curr-game-info', game)
    } else if (game.players[position] == users[socket.id]) {
      game.players[position] = null
      io.to(roomId).emit('curr-game-info', game)
    }
  })

  socket.on('start-game-in-room', ({ roomId }) => {
    const game = roomDetails[roomId]
    const room = getRoomWithId(roomId)
    let shuffledUsersList = game.players
      .slice()
      .sort(() => Math.random() - 0.5)
      .filter(player => player)
    roomDetails[room.id].playersMoveOrder = shuffledUsersList
    roomDetails[room.id].gameStarted = true

    if (room.game == 'Rpsls') {
      roomDetails[room.id].gameState = rpslsStartingState(shuffledUsersList.length);
      gameSecret[roomId] = []
    }
    else if (room.game == 'Tictactoe') {
      gameSecret[roomId] = [shuffledUsersList[0], shuffledUsersList[1]]
    }
    io.to(roomId).emit('curr-game-info', game)
  })

  socket.on('make-move', ({ roomId, move }) => {
    const room = getRoomWithId(roomId)
    const game = roomDetails[roomId]
    if (game.playersMoveOrder[0] === users[socket.id]) {
      switch (room.game) {
        case 'Tictactoe':
          const { boardAfterMove, result } = tictactoeMakeMove(move, game.gameState, gameSecret[roomId])
          game.gameState = boardAfterMove
          game.result = result

          break;
        case 'Rpsls':
          game.gameState = rpslsMakeMove(gameSecret[roomId], users[socket.id], move, game.gameState)
          if (!game.gameState.includes(false)) {
            game.result = rpslsGetWinner(gameSecret[roomId])
          }
          break;
        default:
          break;
      }
      const [first, ...rest] = game.playersMoveOrder
      game.playersMoveOrder = [...rest, first]
    }
    io.to(room.id).emit('curr-game-info', game)
  })

  socket.on('end-game', ({ roomId }) => {
    const room = getRoomWithId(roomId)
    room.game = undefined
    roomDetails[roomId] = { playersMoveOrder: [], gameState: [], result: {}, minPlayers: null, maxPlayers: null, gameStarted: false, players: [] }
    delete gameSecret[roomId]
    io.to(roomId).emit('rooms', rooms)
    io.to(roomId).emit('curr-game-info', roomDetails[roomId])
  })





})


