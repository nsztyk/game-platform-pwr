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
  <div v-if="errorMessage" class="text-center mb-4 text-red-500 font-normal">
    <span>{{ errorMessage }}</span>
  </div>
  <form-button buttonText="Login" @click="handleLogin" />
  <form-link :target="{ name: 'Register' }" navText="Create an account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent, ref } from "vue";

import { loginUser } from "../middleware/AuthenticationService";
import { setToken } from "../middleware/TokenService";
import router from "@/router";

export default defineComponent({
  name: "Login",
  components: { FormInput, FormButton, FormLink },
  setup() {
    const password = ref("");
    const username = ref("");
    const errorMessage = ref("");

    const handleLogin = async () => {
      errorMessage.value = ""

      const user = {
        username: username.value,
        password: password.value,
      };

      const result = await loginUser(user);
      if (result.data.status === "ok") {
        setToken(result.data.data);
        console.log('przeszło logowanie');
        router.push({ name: "Game" });
      } else {
        errorMessage.value = result.data.error
      }
    };
    return {
      password,
      username,
      handleLogin,
      errorMessage
    };
  },
});
</script>
