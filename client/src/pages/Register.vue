<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Register to play!</h3>
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
  <form-input
    id="passwordInput2"
    labelText="Repeat password"
    placeholderText="Enter password"
    type="password"
    v-model="repeatedPassword"
  />
  <div v-if="errorMessage" class="text-center mb-4 text-red-500 font-normal">
    <span>{{ errorMessage }}</span>
  </div>
  <form-button buttonText="Register" @click="handleRegister" />
  <form-link :target="{ name: 'Login' }" navText="Login to exsting account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent, ref } from "vue";
import { registerUser } from "@/middleware/AuthenticationService";
import router from "@/router";

export default defineComponent({
  name: "Register",
  components: { FormInput, FormButton, FormLink },
  setup() {
    const password = ref("");
    const username = ref("");
    const repeatedPassword = ref("");
    const errorMessage = ref("");

    const handleRegister = async () => {
      errorMessage.value = "";
      if (repeatedPassword.value !== password.value) {
        errorMessage.value = "Passwords do not match";
        return;
      }

      const user = {
        username: username.value,
        password: password.value,
        repeatedPassword: repeatedPassword.value,
      };

      // eslint-disable-next-line
      const res = await registerUser(user);

      if (res.data.status == "error") {
        errorMessage.value = res.data.error;
        return;
      }

      router.push({ name: "Login" });
    };
    return {
      password,
      repeatedPassword,
      username,
      handleRegister,
      errorMessage,
    };
  },
});
</script>
