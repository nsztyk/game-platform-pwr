<template>
  <div class="col-span-3">
    <component :is="getGameComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getGameComponent } from "../middleware/GamesService";
import Tictactoe from "../games/Tictactoe.vue";
import Rpsls from "../games/Rpsls.vue";

export default defineComponent({
  setup() {
    return {
      getGameComponent,
    };
  },
  components: {
    Tictactoe,
    Rpsls,
  },
});
</script>
