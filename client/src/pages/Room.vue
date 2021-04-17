<template>
  <div class="flex flex-col mx-auto w-7/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
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
import { removeToken, isTokenAuthorized, getUsername } from "../middleware/TokenService";
import io from "socket.io-client";

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      socket: io("http://localhost:3000"),
      users: [],
      messages: [] as string[],
      destinationId: this.$route.params.id,
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
    sendMessage() {
      this.socket.emit("send-chat-message", {
        message: this.messageText,
        id: this.destinationId,
      });
      this.messages.push(`You: ${this.messageText}`);
      this.messageText = "";
    },
  },
  async created() {
    if (! await isTokenAuthorized()) this.logOut();

    this.socket.emit("new-user", {
      nickname: getUsername(),
      id: this.destinationId,
    });

    this.socket.on("chat-message", ({ message, nickname }) => {
      this.messages.push(`${nickname}: ${message}`);
    });

    this.socket.on("user-connected", (nickname) => {
      this.messages.push(`${nickname} joined!`);
    });

    this.socket.on("user-disconnected", (nickname) => {
      this.messages.push(`${nickname} disconneted!`);
    });
  },
});
</script>
