<template>
  <button
    type="submit"
    class="bg-red-700 rounded-3xl py-1 font-medium mb-4"
    @click.prevent=""
  >
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormButton",
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    onClickfunction: {
      type: Function,
    },
  },
});
</script>
