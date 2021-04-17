<template>
  <div class="flex flex-col mx-auto w-7/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12">
    <h1>You are log-in</h1>
    <button @click="logOut">
      log out
    </button>
    <button @click="createNewRoom">Create new room</button>
    <h2>Created rooms</h2>
    <ul>
      <li v-for="(room, index) in rooms" :key="index">
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
import io from "socket.io-client";

export default defineComponent({
  name: "ChooseGame",
  data() {
    return {
      messageText: "",
      socket: io("http://localhost:3000"),
      users: [],
      messages: [] as string[],
      rooms: [] as object[],
    };
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
    createNewRoom() {
      this.socket.emit("new-room");
    },
  },
  async created() {
    if (! await isTokenAuthorized()){
      this.logOut();
    } 
    this.socket.on("rooms", (rooms) => {
      this.rooms = rooms;
    });

    this.socket.on("join-created-room", (id) => {
      this.socket.disconnect();
      router.push({ name: "Room", params: { id: id } });
    });
  },
});
</script>
