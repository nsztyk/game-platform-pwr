import router from '@/router';
import { getUsername } from './TokenService'
import io, { Socket } from 'socket.io-client'
import { ref, computed } from 'vue';


interface RoomsInterface {
  name: string;
  users: string[];
  id: number;
}


let socket = null as unknown as Socket;
const rooms = ref<RoomsInterface[]>([])
const messages = ref<string[]>([])

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
}


export const connectToServer = () => {
  socket = io('http://localhost:3000')
  addOnEvents()
}

export const exitRoom = () => {
  messages.value = []
  socket.disconnect();
}


export const createNewRoom = () => {
  socket.emit("new-room")
}

export const joinRoom = (id: number) => {
  socket.emit("new-user", {
    nickname: getUsername(),
    id
  });
}

export const sendMessage = (message: string, id: number) => {
  socket.emit("send-chat-message", {
    message,
    id
  })
  messages.value.push(`You: ${message}`)
}

export const getRooms = computed(() => rooms.value);
export const getMessages = computed(() => messages.value)