<template>
  <router-view />
</template>

<style>
@import "https://use.fontawesome.com/releases/v5.15.2/css/all.css";
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { secret } from './PostService'
import router from './router';

export default defineComponent({
  async created(){
    const token = localStorage.getItem('token')
    console.log(token);
    let res;
    if (token)
      res = await secret(token);
    if (res && res.data.status == "ok")
      router.push({name: 'Game'})
    else 
      router.push({name: 'Account'})
  }
})
</script>

