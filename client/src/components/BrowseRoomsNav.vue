<template>
  <div
    class="gray-bg pt-2 pb-0 px-2 xl:px-4 rounded-lg text-center h-full cursor-pointer"
  >
    <slot></slot>
    <div>
      <!-- Todo img alt props-->
      <img class="mx-auto mt-2" :src="require(`@/assets/${imgSrc}`)" alt="Icon" />
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
    }
  },
});
</script>
