<template>
  <div class="custom-shadow bg-gray-900">
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
    <div class="text-xl" v-if="getResult">
      Result: {{ getCurrGameDetails.result }}
    </div>
    <div class="text-xl" v-if="getResult && isAdmin" @click="endGame">
      Submit game
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getGames,
  chooseGame,
  canGameBeStarted,
  getResult,
} from "../middleware/GamesService";
import {
  getCurrGameDetails,
  isAdmin,
  startGame,
  endGame,
} from "../middleware/SocketConnection";

export default defineComponent({
  setup() {
    return {
      getCurrGameDetails,
      isAdmin,
      getGames,
      chooseGame,
      canGameBeStarted,
      getResult,
      startGame,
      endGame,
    };
  },
});
</script>
