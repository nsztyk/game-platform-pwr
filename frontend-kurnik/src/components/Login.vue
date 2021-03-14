<template>
    <div class="container flex mx-auto h-screen items-center justify-center">
      <form
        class="flex flex-col bg-gray-900 text-gray-200 text-xl pb-5 px-10 w-1/4 font-medium custom-shadow"
        autocomplete="off"
        spellcheck="false"
      >
        <i
          class="fas fa-dice-six text-center bg-red-600 rounded-full p-4 max-w-min text-5xl self-center transform-gpu -translate-y-1/2"
        ></i>
        <h3 class="text-center text-3xl -mt-6 mb-6">Login to play!</h3>
        <label for="usernameInput" class="mb-1">Username</label>
        <input
          class="bg-transparent border-b-2 outline-none pb-1 font-normal mb-5"
          type="text"
          name="usernameInput"
          id="usernameInput"
          placeholder="Enter username"
        />
        <label for="passwordInput" class="mb-1">Password</label>
        <input
          class="bg-transparent border-b-2 outline-none pb-1 font-normal mb-6"
          type="password"
          name="passwordInput"
          id="passwordInput"
          placeholder="Enter password"
        />
        <button
          type="submit"
          class="bg-red-700 rounded-3xl py-1 font-medium mb-4"
          @click.prevent=""
        >
          Login
        </button>
        <a class="text-base text-gray-300 font-normal justify-start"
          >Create an account</a
        >
      </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
});
</script>

<style scoped>
.custom-shadow {
  -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.5);
}
</style>
