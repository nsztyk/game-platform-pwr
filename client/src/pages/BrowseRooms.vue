<template>
  <custom-modal />
  <div class="pt-10">
    <!-- TODO change to grid 3 col ? -->
    <div
      class="grid grid-cols-3 gap-x-20 custom-shadow bg-gray-900 w-1/2 mx-auto text-2xl py-2 px-5"
    >
      <router-link :to="{ name: 'Statistics' }">
        <browse-rooms-nav imgSrc="Futures.png">
          Statistics
        </browse-rooms-nav>
      </router-link>
      <browse-rooms-nav imgSrc="Controller.png" @click="newRoom">
        New room
      </browse-rooms-nav>
      <browse-rooms-nav
        imgSrc="Dice.png"
        @click="connectToRandomRoom"
        class="pb-1"
      >
        Random room
      </browse-rooms-nav>
    </div>

    <div
      class="flex flex-col items-stretch justify-between custom-shadow w-1/2 mx-auto text-xl mt-12"
    >
        <template v-for="(room, index) in getRooms" :key="index">
          <router-link :to="{ name: 'Room', params: { id: room.id } }">
            <browse-rooms-room
            :position="index"
            :roomGame="room.game"
            :roomHasPassword="room.hasPassword"
            :roomName="room.name"
            :roomPlayers="room.users"
            />
          </router-link>
        </template>
    </div>

    <!-- Section about connected players -->
    <!-- <div class="my-10">
      <ul>
        <p>PLAYERS</p>
        <li v-for="(player, index) in getPlayers" :key="index">
          {{ player }}
        </li>
      </ul>
    </div> -->
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
import BrowseRoomsNav from "../components/BrowseRoomsNav.vue";
import BrowseRoomsRoom from "../components/BrowseRoomsRoom.vue";

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
  components: { CustomModal, BrowseRoomsNav, BrowseRoomsRoom },
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
