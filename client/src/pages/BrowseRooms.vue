<template>
  <custom-modal />
  <div class="pt-10">
    <div
      class="flex items-stretch justify-between custom-shadow bg-gray-900 w-1/2 mx-auto text-2xl py-2 px-5"
    >
      <router-link :to="{ name: 'Statistics' }">
        <menu-nav imgSrc="Futures.png">
          Statistics
        </menu-nav>
      </router-link>
      <menu-nav imgSrc="Controller.png" @click="newRoom">
        New room
      </menu-nav>
      <menu-nav imgSrc="Dice.png" @click="connectToRandomRoom" class="pb-1">
        Random room
      </menu-nav>
    </div>
    
    <div
      class="flex items-stretch justify-between custom-shadow bg-gray-900 w-1/2 mx-auto text-xl mt-12"
    >
    <div class="grid grid-cols-4 w-full items-center py-2 px-4 text-center">
        <div>
          Gra masna
        </div>
        <div>
          RPSLS
        </div>
        <div>
          <img class="mx-auto" src="../assets/Dice.png" alt="">
        </div>
        <div class="flex flex-col">
          <div>
            Player1
          </div>
          <div>
            Player2
          </div>
        </div>
    </div>
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

    </div>

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
import { defineComponent } from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import { showModal } from "../use/modalControl";
import {
  connectToServer,
  getRooms,
  getPlayers,
  exitRoom,
} from "../middleware/SocketConnection";
import CustomModal from "@/components/CustomModal.vue";
import MenuNav from "../components/MenuNav.vue";

export default defineComponent({
  name: "BrowseRooms",
  setup() {
    const connectToRandomRoom = () => {
      const roomsID = getRooms.value.map((roomInfo) => roomInfo.id);
      if (roomsID.length > 0) {
        const chosenId = [Math.floor(Math.random() * roomsID.length)];
        router.push({ name: "Room", params: { id: chosenId[0] } });
      }
    };
    const newRoom = () => {
      showModal();
    };
    return {
      getRooms,
      getPlayers,
      connectToRandomRoom,
      newRoom,
    };
  },
  components: { CustomModal, MenuNav },
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
