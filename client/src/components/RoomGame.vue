<template>
  <component :is="getGameComponent" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getGameComponent } from "../middleware/GamesService";

export default defineComponent({
  setup() {
    return {
      getGameComponent,
    };
  },
});
</script>
