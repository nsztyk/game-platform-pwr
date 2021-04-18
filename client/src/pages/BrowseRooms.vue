<template>
  <div
    class="flex flex-col mx-auto w-7/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
  >
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
    <button @click="createNewRoom">Create new room</button>
    <h2>Created rooms</h2>
    <ul>
      <li v-for="(room, index) in getRooms" :key="index">
        <router-link :to="{ name: 'Room', params: { id: room.id } }">
          {{ room.name }}
        </router-link>
        {{ room.users }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import {
  connectToServer,
  createNewRoom,
  getRooms,
} from "../middleware/SocketConnection";

export default defineComponent({
  name: "ChooseGame",
  setup() {
    return {
      createNewRoom,
      getRooms,
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
  },
  async created() {
    // if (! await isTokenAuthorized()) this.logOut();
    connectToServer();
  },
});
</script>
