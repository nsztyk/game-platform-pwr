<template>
  <div class="grid grid-cols-3 text-gray-800" id="tictactoe-wrapper">
    <div
      v-for="(boardPiece, index) in getGameState"
      :key="index"
      class="square text-center"
      @click="makeMove(index)"
    >
      {{ boardPiece }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getGameState, move, gameEnded} from "../middleware/GamesService";
export default defineComponent({
  name: "Tictactoe",
  setup(){
    const isLegalMove = (field: number) => {
      return !getGameState.value[field]
    }
    const makeMove = (field: number) => {
      if (isLegalMove(field) && !gameEnded.value)
        move(field.toString())
    }
    return {
      getGameState,
      makeMove,
      gameEnded,
    }
  }
});
</script>

<style scoped>
.square {
  height: 160px;
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
