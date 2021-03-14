<template>
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
  <router-link class="text-base text-gray-300 font-normal justify-start" :to="{name: 'Register'}">
    Create an account
  </router-link>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style></style>
