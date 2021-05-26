<template>
  <div class="custom-shadow bg-gray-900 col-span-2">
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
});
</script>
