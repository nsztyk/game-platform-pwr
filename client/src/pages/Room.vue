<template>
  <div
    class="flex flex-col mx-auto w-7/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
  >
    <button @click="logOut">
      log out
    </button>
    <div v-if="isAdmin">
      <p class="text-lg">You are admin, choose game to play</p>
      <ul>
        <li v-for="(game, index) in getGames" :key="index" @click="chooseGame(game)" class="cursor-pointer">
          {{ game }}
        </li>
      </ul>
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
    <component :is="getGameComponent" />
    {{roomDetails}}
    {{isMyTurn}}
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import {
  joinRoom,
  sendMessage,
  getMessages,
  exitRoom,
  isAdmin,
  roomDetails
} from "../middleware/SocketConnection";
import { getGames, chooseGame, getGameComponent, exitGame, isMyTurn} from "../middleware/GamesService";
import Tictactoe from "../games/Tictactoe.vue"

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      destinationId: Number(this.$route.params.id)
    };
  },
  components: {
    Tictactoe
  },
  setup() {
    return {
      getMessages,
      isAdmin,
      getGames,
      chooseGame,
      getGameComponent,
      roomDetails,
      isMyTurn
    };
  },
  beforeRouteLeave() {
    exitRoom();
    exitGame();
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
