import router from '@/router';
import { getUsername } from './TokenService'
import io, { Socket } from 'socket.io-client'
import { ref, computed } from 'vue';


interface RoomsInterface {
  name: string;
  users: string[];
  id: number;
  admin: string;
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
    id: currentRoom
  })
  messages.value.push(`You: ${message}`)
}

export const isAdmin = computed(() => {
  const room = rooms.value.filter(potentialRoom => potentialRoom.id == currentRoom.value)[0]
  if (room)
    return room.admin === getUsername()
  return false
})

export const getRooms = computed(() => rooms.value);
export const getMessages = computed(() => messages.value)
export const getPlayers = computed(() => players.value)
