<template>
  <div class="grid grid-cols-3" id="tictactoe-wrapper">
    <h2>rock paper scissors lizard smock</h2>
  </div>
  <div class="text-xl" v-if="getWinner">WINNER: {{getWinner}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tictactoe",
});
</script>
