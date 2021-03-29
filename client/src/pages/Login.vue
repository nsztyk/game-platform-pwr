<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Login to play!</h3>

  <button @click.prevent="handleSecret">Secret</button>
  <form-input
    id="usernameInput"
    labelText="Username"
    placeholderText="Enter username"
    type="text"
    v-model="username"
  />
  <form-input
    id="passwordInput"
    labelText="Password"
    placeholderText="Enter password"
    type="password"
    v-model="password"
  />
  <form-button buttonText="Login" @click="handleLogin" />
  <form-link :target="{ name: 'Register' }" navText="Create an account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent, ref } from "vue";

import { loginUser, secret } from "../PostService";
import router from "@/router";

export default defineComponent({
  name: "Login",
  components: { FormInput, FormButton, FormLink },
  setup() {
    const password = ref("");
    const username = ref("");

    const handleLogin = async () => {
      const user = {
        username: username.value,
        password: password.value,
      };

      const result = await loginUser(user);
      if (result.data.status === "ok"){
        localStorage.setItem('token', result.data.data)
        router.push({name: 'Game'})
      }
      else
        localStorage.removeItem('token')
      console.log(localStorage);
    };

    const handleSecret = async () => {
      const token = localStorage.getItem('token');

      let result;

      if (token)
        result = await secret(token);
      else 
        result = {status: 'error', error: 'No token was given'}


      console.log(result);
    }
    return {
      password,
      username,
      handleLogin,
      handleSecret
    };
  },
});
</script>
