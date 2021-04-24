import router from '@/router';
import { getUsername } from './TokenService'
import io, { Socket } from 'socket.io-client'
import { ref, computed } from 'vue';
import { AvaliableGames, initGame } from "./GamesService"

interface RoomsInterface {
  name: string;
  users: string[];
  id: number;
  admin: string;
  game: AvaliableGames;
  playersMoveOrder: string[];
  gameState: {
    board: [];
  };
}


let socket = null as unknown as Socket;
const rooms = ref<RoomsInterface[]>([])
const messages = ref<string[]>([])
const players = ref<string[]>([])
const currentRoom = ref<number>()

const addOnEvents = () => {
  socket.on("rooms", (roomsInfo) => {
    rooms.value = roomsInfo;
  });

  socket.on("join-created-room", (id) => {
    router.push({ name: "Room", params: { id: id } });
  });

  socket.on("chat-message", ({ message, nickname }) => {
    console.log("XD");
    messages.value.push(`${nickname}: ${message}`);
  });

  socket.on("user-connected", (nickname) => {
    messages.value.push(`${nickname} joined!`);
  });

  socket.on("user-disconnected", (nickname) => {
    messages.value.push(`${nickname} disconneted!`);
  });

  socket.on("connected-players", (playersInfo) => {
    players.value = playersInfo
  })

  socket.on("initalize-game-client", ({ game }) => {
    initGame(game)
  })

}


export const connectToServer = () => {
  socket = io('http://localhost:3000')
  socket.emit('register-user-on-server', getUsername())
  addOnEvents()
}

export const exitRoom = () => {
  messages.value = []
  currentRoom.value = NaN
  if (socket)
    socket.disconnect();
}


export const createNewRoom = () => {
  socket.emit("new-room")
}

export const joinRoom = (id: number) => {
  socket.emit("join-room", id);
  currentRoom.value = id
}

export const sendMessage = (message: string) => {
  socket.emit("send-chat-message", {
    message,
    id: currentRoom.value
  })
  messages.value.push(`You: ${message}`)
}

export const isAdmin = computed(() => {
  const room = rooms.value.filter(potentialRoom => potentialRoom.id == currentRoom.value)[0]
  if (room)
    return room.admin === getUsername()
  return false
})

export const roomDetails = computed(() => rooms.value.filter(potentialRoom => potentialRoom.id == currentRoom.value)[0])
export const getRooms = computed(() => rooms.value);
export const getMessages = computed(() => messages.value)
export const getPlayers = computed(() => players.value)


// Games section


export const selectGameToPlay = (chosenGame: AvaliableGames) => {
  socket.emit('chosen-game', {
    selectedGame: chosenGame,
    id: currentRoom.value
  })
}

export const makeMove = (move: string) => {
  socket.emit('make-move', {
    player: getUsername(),
    roomId: currentRoom.value,
    move
  })
}