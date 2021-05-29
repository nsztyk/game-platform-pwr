<template>
  <div class="custom-shadow bg-gray-900 col-span-3 text-xl py-2">
    <div v-if="isAdmin">
      <div class="flex items-center justify-center mb-3">
        <h3 class="mr-3 text-3xl">
          Admin
        </h3>
        <img src="../assets/Admin.png" alt="Admin icon" />
      </div>
      <div
        class="grid grid-cols-3 gap-5 px-2 text-center items-center"
        v-if="!gameStarted"
      >
        <div>
          Choose Game:
        </div>
        <div
          v-for="(game, index) in getGames"
          :key="index"
          @click="chooseGame(game)"
          class="cursor-pointer wrapper px-3 py-1 rounded-lg"
          :class="{ active: currGame == game }"
        >
          {{ game }}
        </div>
      </div>
      <div v-if="gameStarted" class="text-center">
        {{turnInfo}}
      </div>
    </div>
    <template v-else>
      <div class="flex items-center justify-center mb-3">
        <h3 class="mr-3 text-3xl">
          Player
        </h3>
        <img src="../assets/Player.png" alt="Player icon" />
      </div>
      <div v-if="!gameStarted">
        <div class="text-center" v-if="currGame">
          <span class="mr-5">Current game:</span>
          <span>{{ currGame }}</span>
        </div>
        <div v-else class="text-center">
          Game has not been selected by admin yet
        </div>
      </div>
      <div v-if="gameStarted" class="text-center">
        {{turnInfo}}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getGames,
  chooseGame,
  canGameBeStarted,
  gameStarted,
  isMyTurn
} from "../middleware/GamesService";
import {
  getCurrGameDetails,
  isAdmin,
  roomDetails,
} from "../middleware/SocketConnection";

export default defineComponent({
  setup() {
    return {
      getCurrGameDetails,
      isAdmin,
      getGames,
      chooseGame,
      canGameBeStarted,
      gameStarted
    };
  },
  computed: {
    currGame() {
      if (roomDetails.value) return roomDetails.value.game;
      return false;
    },
    turnInfo() {
      if (isMyTurn.value) return "Your turn, make a move!"
      return "Wait for your turn!"
    }
  },
});
</script>

<style scoped>
.wrapper {
  background-color: #0b111e;
}

.active {
  position: relative;
}

.active:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid #b7b7b7;
}
</style>
