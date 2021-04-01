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
  />
  <form-button buttonText="Register" @click="handleRegister"/>
  <form-link :target="{ name: 'Login' }" navText="Login to exsting account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent, ref } from "vue";
import { registerUser } from "@/middleware/AuthenticationService";

export default defineComponent({
  name: "Register",
  components: { FormInput, FormButton, FormLink },
  setup() {
    const password = ref("");
    const username = ref("");

    const handleRegister = async () => {
      console.log("loggin");
      const user = {
        username: username.value,
        password: password.value,
      };
      
      // eslint-disable-next-line
      const res = await registerUser(user);
    };
    return {
      password,
      username,
      handleRegister,
    };
  },
});
</script>
