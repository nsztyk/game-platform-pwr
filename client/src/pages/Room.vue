<template>
  <div class="flex flex-col mx-auto w-7/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
    <div v-if="isAdmin" class="text-lg">
      YOU ARE ADMIN
    </div>
    <input type="text" placeholder="message" v-model="messageText" />
    <button @click="sendMessageToOthers">Send</button>
    <div>
      <ul>
        <li v-for="(message, index) in getMessages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import {
  removeToken,
  isTokenAuthorized,
} from "../middleware/TokenService";
import {
  joinRoom,
  sendMessage,
  getMessages,
  exitRoom,
  isAdmin,
} from "../middleware/SocketConnection";

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      destinationId: Number(this.$route.params.id),
    };
  },
  setup() {
    return {
      getMessages,
      isAdmin
    };
  },
  beforeRouteLeave() {
    exitRoom();
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
    sendMessageToOthers() {
      sendMessage(this.messageText);
      this.messageText = "";
    },
  },
  async created() {
    if (await isTokenAuthorized()) joinRoom(this.destinationId);
    else this.logOut();
  },
});
</script>
