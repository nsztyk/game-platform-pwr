<template>
  <modal-create-room />
  <div class="pt-10 mx-auto w-11/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
    <div
      class="grid grid-cols-3 gap-x-6 lg:gap-x-10 xl:gap-x-16 2xl:gap-x-20 custom-shadow bg-gray-900 text-2xl py-2 px-5"
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
      class="flex flex-col items-stretch justify-between custom-shadow mx-auto text-xl mt-12"
    >
      <div
        class="grid grid-cols-4 w-full items-center py-3 px-2 text-center bg-gray-900 text-xl border-b-2 border-gray-600"
      >
        <div>Name</div>
        <div>Game</div>
        <div>Password</div>
        <div>Players</div>
      </div>
      <div v-if="!getRooms.length" class="bg-gray-900 text-center py-3">
        There aren't any rooms, create one!
      </div>
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
import { showCreateRoomModal } from "../use/modalControl";
import {
  connectToServer,
  getRooms,
  getPlayers,
  exitRoom,
} from "../middleware/SocketConnection";
import BrowseRoomsNav from "../components/BrowseRoomsNav.vue";
import BrowseRoomsRoom from "../components/BrowseRoomsRoom.vue";
import ModalCreateRoom from "@/components/ModalCreateRoom.vue";

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
      showCreateRoomModal();
    };
    return {
      getRooms,
      getPlayers,
      connectToRandomRoom,
      newRoom,
    };
  },
  components: { BrowseRoomsNav, BrowseRoomsRoom, ModalCreateRoom },
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
