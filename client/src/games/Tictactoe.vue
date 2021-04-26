<template>
  <div class="grid grid-cols-3" id="tictactoe-wrapper">
    <div
      v-for="(boardPiece, index) in getGameState"
      :key="index"
      class="square text-center"
      @click="makeMove(index)"
    >
      {{ boardPiece }}
    </div>
  </div>
  <div class="text-xl" v-if="getWinner">WINNER: {{getWinner}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getGameState, move, getWinner} from "../middleware/GamesService";
export default defineComponent({
  name: "Tictactoe",
  setup(){
    const isLegalMove = (field: number) => {
      return !getGameState.value[field]
    }
    const makeMove = (field: number) => {
      if (isLegalMove(field) && !getWinner.value)
        move(field.toString())
    }
    return {
      getGameState,
      makeMove,
      getWinner,
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
