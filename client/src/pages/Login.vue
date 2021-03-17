<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Login to play!</h3>
  <form-input
    id="usernameInput"
    labelText="Username"
    placeholderText="Enter username"
    type="text"
  />
  <form-input
    id="passwordInput"
    labelText="Password"
    placeholderText="Enter password"
    type="password"
  />
  <form-button buttonText="Login" />
  <form-link :target="{ name: 'Register' }" navText="Create an account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  components: { FormInput, FormButton, FormLink },
});
</script>
