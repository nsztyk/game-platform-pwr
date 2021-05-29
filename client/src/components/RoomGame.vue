<template>
  <div class="col-span-3 order-4 lg:order-3">
    <component :is="getGameComponent" class="relative">
      <div
        class="absolute inset-0 bg-gray-900 bg-opacity-75 text-gray-200"
        v-if="(!gameStarted || gameEnded) && isInitiated"
      >
        <div class="center">
          <div v-if="!gameStarted">
            <div v-if="!canGameBeStarted">
              Need more players to start the game
            </div>
            <div v-if="canGameBeStarted">
              <div v-if="isAdmin" @click="startGame">
                Start the Game
              </div>
              <div v-else>
                Wait for admin to start the game
              </div>
            </div>
          </div>
          <div v-if="gameEnded">
            <div>
              {{ getResult }}
            </div>
            <div v-if="isAdmin" @click="endGame">
              Submit
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getGameComponent,
  canGameBeStarted,
  gameEnded,
  isInitiated,
  gameStarted,
  getResult,
} from "../middleware/GamesService";
import {
  startGame,
  endGame,
  getCurrGameDetails,
  isAdmin,
} from "../middleware/SocketConnection";
import Tictactoe from "../games/Tictactoe.vue";
import Rpsls from "../games/Rpsls.vue";

export default defineComponent({
  setup() {
    return {
      getGameComponent,
      canGameBeStarted,
      gameEnded,
      startGame,
      endGame,
      isInitiated,
      getCurrGameDetails,
      gameStarted,
      getResult,
      isAdmin,
    };
  },
  components: {
    Tictactoe,
    Rpsls,
  },
});
</script>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
</style>
