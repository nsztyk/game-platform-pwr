<template>
  <div>
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
  </div>
</template>

<script lang="ts">

import router from '@/router'
import { defineComponent } from 'vue'
import { removeToken, isTokenAuthorized } from '../middleware/TokenService'

export default defineComponent({
  name: "ChooseGame",
  setup(){
    const logOut = () => {
      removeToken()
      router.push({name: 'Account'})
    }
    return {
      logOut
    }
  },
  async beforeCreate(){
    if (! await isTokenAuthorized()){
      router.push({name: 'Account'})
    }
  }
})
</script>