<template>
  <div class="flex flex-col w-1/4 mx-auto">
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
    <input type="text" placeholder="message" v-model="messageText" />
    <button @click="sendMessage">Send</button>
    <div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
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
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
    sendMessage() {
      this.socket.emit("send-chat-message", this.messageText);
      this.messages.push(`You: ${this.messageText}`)
      this.messageText = "";
    },
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

    this.socket.on("user-connected", nickname => {
      this.messages.push(`${nickname} joined!`);
    });

    this.socket.on("user-disconnected", nickname => {
      this.messages.push(`${nickname} disconneted!`)
    })
  },
});
</script>
