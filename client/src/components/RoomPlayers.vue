<template>
  <div class="custom-shadow bg-gray-900 col-span-2 self-stretch">
    <div v-if="isInitiated" class="h-full">
      <div class="grid grid-cols-2 h-full px-4 py-3 gap-4">
        <div
          v-for="(player, index) in getCurrGameDetails.players"
          :key="index"
          class="bg-gray-200 text-gray-900 rounded-md px-2 flex flex-col justify-center cursor-pointer"
          @click="addPlayerToGame(index)"
        >
          {{ index }}
          {{ getPlayerInPosition(index) }}
        </div>
        <template v-if="addBlankRow">
          <div v-for="elem in howManyElems" :key="elem" class="bg-gray-200 text-gray-900 rounded-md px-2 flex flex-col justify-center">
              ---------------------
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPlayerInPosition, isInitiated } from "../middleware/GamesService";
import {
  addPlayerToGame,
  getCurrGameDetails,
} from "../middleware/SocketConnection";

export default defineComponent({
  setup() {
    return {
      getPlayerInPosition,
      isInitiated,
      addPlayerToGame,
      getCurrGameDetails,
    };
  },
  computed: {
    addBlankRow() {
      return getCurrGameDetails.value.players.length < 3
    },
    howManyElems(){
      return 4 - getCurrGameDetails.value.players.length
    }
  }
});
</script>
