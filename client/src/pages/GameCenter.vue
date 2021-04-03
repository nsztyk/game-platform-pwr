<template>
  <div class="flex flex-col w-1/4 mx-auto">
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
    <button @click="createNewRoom">Create new room</button>
    <h2>Craeted rooms</h2>
    <ul>
      <li v-for="(room, index) in rooms" :key="index">
        <router-link :to="{ name: 'Room', params: { id: room.id } }">
          {{ room.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { removeToken } from "../middleware/TokenService";
import io from "socket.io-client";

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      socket: io("http://localhost:3000"),
      users: [],
      messages: [] as string[],
      rooms: [] as object[],
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
    sendMessage() {
      this.socket.emit("send-chat-message", this.messageText);
      this.messages.push(`You: ${this.messageText}`);
      this.messageText = "";
    },
    createNewRoom() {
      console.log("XD");
    }
  },
  created() {
    this.socket.emit(
      "new-user",
      Math.random()
        .toString(36)
        .slice(2)
    );

    this.socket.on("chat-message", ({ message, nickname }) => {
      this.messages.push(`${nickname}: ${message}`);
    });

    this.socket.on("user-connected", (nickname) => {
      this.messages.push(`${nickname} joined!`);
    });

    this.socket.on("user-disconnected", (nickname) => {
      this.messages.push(`${nickname} disconneted!`);
    });

    this.socket.on("rooms", (rooms) => {
      console.log(rooms);
      this.rooms = rooms;
    });
  },
});
</script>
