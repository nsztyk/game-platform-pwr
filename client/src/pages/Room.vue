<template>
  <button @click="logOut">
    log out
  </button>
  <div class="flex flex-row mx-auto w-6/12">
    <div class="bg-gray-600 w-full p-5">
      <div v-if="isAdmin && !getCurrGameDetails.gameStarted">
        <p class="text-lg">You are admin, choose game to play</p>
        <ul>
          <li
            v-for="(game, index) in getGames"
            :key="index"
            @click="chooseGame(game)"
            class="cursor-pointer"
          >
            {{ game }}
          </li>
        </ul>
        <div v-if="canGameBeStarted" @click="startGame">
          Start the game
        </div>
      </div>
      <div v-else-if="!getCurrGameDetails.gameStarted">
        <p class="text-lg">Admin is choosing game to play</p>
      </div>
      <p class="text-lg" v-if="getCurrGameDetails.gameStarted">
          GAME STARTED
        </p>
      <component :is="getGameComponent" />
    </div>
    <div class="bg-gray-200 w-full p-5">
      <div v-if="isInitiated">
        <div class="grid grid-cols-2">
          <div
            v-for="(player, index) in getCurrGameDetails.players"
            :key="index"
            class="border-2 border-black m-1 ml-0 px-2 py-1"
            @click="addPlayerToGame(index)"
          >
            {{ index }}
            {{ getPlayerInPosition(index) }}
          </div>
        </div>
      </div>
      <div>
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
    </div>
  </div>
  DEV INFO
  <p>roomDetail</p>
  {{ roomDetails }}
  <p>IsMyTurn</p>
  {{ isMyTurn }}
  <p>CurrgameDetails</p>
  {{ getCurrGameDetails }}
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
  roomDetails,
  getCurrGameDetails,
  addPlayerToGame,
  startGame,
} from "../middleware/SocketConnection";
import {
  getGames,
  chooseGame,
  getGameComponent,
  exitGame,
  isMyTurn,
  isInitiated,
  getPlayerInPosition,
  canGameBeStarted,
} from "../middleware/GamesService";
import Tictactoe from "../games/Tictactoe.vue";

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      destinationId: Number(this.$route.params.id),
    };
  },
  components: {
    Tictactoe,
  },
  setup() {
    return {
      getMessages,
      isAdmin,
      getGames,
      chooseGame,
      getGameComponent,
      roomDetails,
      isMyTurn,
      getCurrGameDetails,
      isInitiated,
      addPlayerToGame,
      getPlayerInPosition,
      canGameBeStarted,
      startGame,
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
