<template>
  <div class="container flex mx-auto h-screen items-center justify-center">
    <form
      class="flex flex-col bg-gray-900 text-gray-200 text-xl pb-5 px-10 w-8/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12 font-medium custom-shadow"
      autocomplete="off"
      spellcheck="false"
    >
      <i
        class="fas fa-dice-six text-center bg-red-600 rounded-full p-4 max-w-min text-5xl self-center transform-gpu -translate-y-1/2"
      ></i>
      <router-view />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Account",
});
</script>
