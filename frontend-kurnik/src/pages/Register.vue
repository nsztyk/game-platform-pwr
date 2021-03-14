<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Register to play!</h3>
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
  <label for="passwordInputReapeat" class="mb-1">Reapeat password</label>
  <input
    class="bg-transparent border-b-2 outline-none pb-1 font-normal mb-6"
    type="password"
    name="passwordInputReapeat"
    id="passwordInputReapeat"
    placeholder="password"
  />
  <button
    type="submit"
    class="bg-red-700 rounded-3xl py-1 font-medium mb-4"
    @click.prevent=""
  >
    Register
  </button>
  <router-link class="text-base text-gray-300 font-normal justify-start" :to="{name: 'Login'}">
    Have and account? Log in
  </router-link>
</template>

<script>
export default {

}
</script>

<style>

</style>