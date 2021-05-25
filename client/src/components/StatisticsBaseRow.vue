<template>
  <div class="justify-self-center col-start-2 col-end-2 mb-6">{{ num }}</div>

  <div class="justify-self-center">
    <span class="text-green-600">{{ win }}</span>
    <span> / </span>
    <span class="text-yellow-400">{{ draw }} </span>
    <span> / </span>
    <span class="text-red-600">{{ lose }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    num: {
      type: String,
      required: true,
    },
    win: {
      type: Number,
      required: true,
    },
    draw: {
      type: Number,
      required: true,
    },
    lose: {
      type: Number,
      required: true,
    },
  },
});
</script>
