<template>
  <div>
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
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
      socket: io("http://localhost:3000"),
      users: [],
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
  },
  created() {
    this.socket.on("chat-message", (data) => {
      console.log(data);
    });
  },
});
</script>