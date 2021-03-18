<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Login to play!</h3>
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

import { loginUser } from "../PostService";

export default defineComponent({
  name: "Login",
  components: { FormInput, FormButton, FormLink },
  setup() {
    const password = ref("");
    const username = ref("");

    const handleLogin = async () => {
      console.log("loggin");
      const user = {
        username: username.value,
        password: password.value,
      };

      console.log(user);
      const siema = await loginUser(user);
      console.log(siema);
    };
    return {
      password,
      username,
      handleLogin,
    };
  },
});
</script>
