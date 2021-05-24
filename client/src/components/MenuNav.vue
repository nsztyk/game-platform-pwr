<template>
  <div
    class="gray-bg pt-2 pb-0 px-10 rounded-lg text-center h-full cursor-pointer"
    style="min-width: 220px"
  >
    <slot> </slot>
    <div>
      <img class="mx-auto mt-2" :src="require(`@/assets/${imgSrc}`)" alt="Statistics icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    addPadingBot: {
      type: Boolean,
      required: false,
    }
  },
});
</script>
