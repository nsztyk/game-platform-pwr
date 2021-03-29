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

export default defineComponent({
  name: "ChooseGame",
  setup(){
    const logOut = () => {
      localStorage.removeItem('token')
      router.push({name: 'Account'})
    }
    return {
      logOut
    }
  }
})
</script>

<style scoped>

</style>