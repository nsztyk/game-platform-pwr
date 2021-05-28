<template>
  <modal-enter-password />
  <div
    class="flex flex-col lg:grid lg:grid-cols-5 gap-10 mx-auto w-11/12 sm:w-9/12 md:w-7/12 lg:w-9/12 xl:w-7/12 2xl:w-6/12 pt-20 items-stretch lg:items-start"
  >
    <room-admin />
    <room-players v-if="showPlayersComponent" />
    <room-game v-if="getGameComponent" />
    <room-chat />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import {
  exitRoom,
  isAdmin,
  joinRoom,
  roomDetails,
  setCurrentRoom,
  getCurrGameDetails,
} from "../middleware/SocketConnection";
import { exitGame, getGameComponent } from "../middleware/GamesService";
import RoomAdmin from "../components/RoomAdmin.vue";
import RoomPlayers from "../components/RoomPlayers.vue";
import RoomChat from "@/components/RoomChat.vue";
import RoomGame from "@/components/RoomGame.vue";
import ModalEnterPassword from "../components/ModalEnterPassword.vue";
import { showEnterPasswordModal } from "../use/modalControl";

export default defineComponent({
  name: "Room",
  data() {
    return {
      messageText: "",
      destinationId: Number(this.$route.params.id),
    };
  },
  computed: {
    roomHasPassword() {
      return roomDetails.value ? roomDetails.value.hasPassword : undefined;
    },
    showPlayersComponent() {
      return (
        getCurrGameDetails.value && getCurrGameDetails.value.players.length
      );
    },
  },
  setup() {
    return {
      getGameComponent,
    };
  },
  components: {
    RoomAdmin,
    RoomPlayers,
    RoomChat,
    RoomGame,
    ModalEnterPassword,
  },
  beforeRouteLeave() {
    exitRoom();
    exitGame();
  },
  methods: {
    logOut() {
      removeToken();
      router.push({ name: "Account" });
    },
  },
  watch: {
    roomHasPassword(passwd) {
      if (passwd !== undefined && !isAdmin.value) {
        // If room doesnt have password just connect to the server
        if (!passwd) {
          joinRoom();
        } else {
          showEnterPasswordModal();
        }
      }
    },
  },
  async created() {
    if (await isTokenAuthorized()) {
      setCurrentRoom(this.destinationId);
      if (isAdmin.value) {
        joinRoom();
      }
    } else this.logOut();
  },
});
</script>
