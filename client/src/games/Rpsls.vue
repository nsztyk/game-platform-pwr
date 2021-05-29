<template>
  <div class="flex flex-row justify-evenly pt-10">
    <div v-for="(option, index) in options" :key="index" @click="makeMove(option)">
      {{ option }}
    </div>
  </div>
  <div class="text-xl" v-if="gameEnded">WINNER: {{ gameEnded }}</div>
</template>

<script lang="ts">
import { move } from "../middleware/GamesService";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tictactoe",
  data() {
    return {
      options: ["rock", "paper", "scissors", "lizard", "spock"],
    };
  },
  setup() {
    const makeMove = (field: number) => {
      move(field.toString());
    };
    return {
      makeMove,
    };
  },
});
</script>
