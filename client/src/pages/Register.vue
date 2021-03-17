<template>
  <h3 class="text-center text-3xl -mt-6 mb-6">Register to play!</h3>
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
  <form-input
    id="passwordInput2"
    labelText="Repeat password"
    placeholderText="Enter password"
    type="password"
  />
  <form-button buttonText="Register" />
  <form-link :target="{ name: 'Login' }" navText="Login to exsting account" />
</template>

<script lang="ts">
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import FormLink from "@/components/FormLink.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "Register",
  components: { FormInput, FormButton, FormLink },
});
</script>
