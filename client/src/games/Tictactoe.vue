<template>
  <div class="grid grid-cols-3" id="tictactoe-wrapper">
    <div
      v-for="(boardPiece, index) in gameState"
      :key="index"
      class="square text-center"
    >
      {{ boardPiece }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gameState} from "../middleware/GamesService";
export default defineComponent({
  name: "Tictactoe",
  setup(){
    return {
      gameState
    }
  }
});
</script>

<style scoped>
.square {
  height: 150px;
  background-color: #ddd;
  font-size: 5rem;
}
.square:nth-child(3n + 2) {
  border-left: 2px solid #222;
  border-right: 2px solid #222;
}
.square:nth-child(n + 4) {
  border-top: 2px solid #222;
  border-bottom: 2px solid #222;
}
.square:nth-child(n + 7) {
  border-top: 0;
  border-bottom: 0;
}
</style>
