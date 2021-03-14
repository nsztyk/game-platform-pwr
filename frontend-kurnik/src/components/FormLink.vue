<template>
  <router-link
    class="text-base text-gray-300 font-normal justify-start"
    :to="target"
  >
    {{ navText }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface RouteData {
  name: string;
}

export default defineComponent({
  name: "FormLink",
  props: {
    target: {
      type: Object as PropType<RouteData>,
      required: true,
    },
    navText: {
      type: String,
    },
  },
});
</script>

<style></style>
