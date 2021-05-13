<template>
  <div
    class="flex flex-col mx-auto w-7/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
  >
    <button @click="logOut">
      log out
    </button>
    <router-link :to="{ name: 'Statistics' }">
      Check your stats
    </router-link>

    <custom-modal />

    <button @click="newRoom">Create new room</button>
    <button @click="connectToRandomRoom">Connect to a random room</button>
    <h2>Created rooms, click name to join!</h2>
    <ul>
      <li v-for="(room, index) in getRooms" :key="index">
        <router-link :to="{ name: 'Room', params: { id: room.id } }">
          {{ room.name }}
        </router-link>
        {{ room.users }}
        <p class="text-green-500">
          {{ room.admin }}
        </p>
      </li>
    </ul>
    <div class="my-10">
      <ul>
        <p>PLAYERS</p>
        <li v-for="(player, index) in getPlayers" :key="index">
          {{ player }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent} from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import { showModal} from '../use/modalControl'
import {
  connectToServer,
  getRooms,
  getPlayers,
  exitRoom,
} from "../middleware/SocketConnection";
import CustomModal from "@/components/CustomModal.vue";

export default defineComponent({
  name: "ChooseGame",
  setup() {
    const connectToRandomRoom = () => {
      const roomsID = getRooms.value.map((roomInfo) => roomInfo.id);
      const chosenId = [Math.floor(Math.random() * roomsID.length)];
      router.push({ name: "Room", params: { id: chosenId[0] } });
    };
    const newRoom = () => {
      showModal()
    }
    return {
      getRooms,
      getPlayers,
      connectToRandomRoom,
      newRoom,
    };
  },
  components: { CustomModal },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
  },
  beforeRouteLeave(to) {
    if (to.name !== "Room") exitRoom();
  },
  async created() {
    if (await isTokenAuthorized()) connectToServer();
    else this.logOut();
  },
});
</script>
