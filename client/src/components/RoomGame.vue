<template>
  <div class="col-span-3 order-4 lg:order-3">
    <component :is="getGameComponent" class="relative">
      <div
        class="absolute inset-0 bg-gray-900 bg-opacity-75 text-gray-200"
        v-if="(!gameStarted || gameEnded) && isInitiated"
      >
        <div class="center ">
          <div v-if="!gameStarted">
            <div v-if="!canGameBeStarted">
              Need more players to start the game
            </div>
            <div v-if="canGameBeStarted">
              <div v-if="isAdmin" @click="startGame" class="cursor-pointer bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-lg">
                Start the Game
              </div>
              <div v-else>
                Wait for admin to start the game
              </div>
            </div>
          </div>
          <div v-if="gameEnded" class="flex flex-col">
            <div>
              <div class="text-2xl mb-3"> Results: </div>
              <div v-for="result in getResult" :key="result.player" class="text-2xl grid grid-cols-2 gap-4"> 
                <div> {{result.player}} </div> 
                
                <div :class="resultColor(result.result)"> {{result.result}} </div>
              </div>
              <!-- {{ getResult }} -->
            </div>
            <div v-if="isAdmin" @click="endGame" class="cursor-pointer bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-lg mt-3 text-center text-lg">
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
    const resultColor = (result: string) => {
      switch (result) {
        case 'Win':
          return 'text-green-500'
        case 'Lose':
          return 'text-red-500'
        case 'Draw':
          return 'text-yellow-500'
        default:
          return ''
      }
    }
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
      resultColor
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
