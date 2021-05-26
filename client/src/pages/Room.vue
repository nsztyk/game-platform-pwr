<template>
  <div class="grid grid-cols-2 mx-auto w-1/2 pt-10">
    <room-admin />
    <room-players />
    <component :is="getGameComponent"/>
    <room-chat />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { removeToken, isTokenAuthorized } from "../middleware/TokenService";
import { exitRoom, isAdmin, joinRoom, roomDetails, setCurrentRoom } from "../middleware/SocketConnection";
import { exitGame, getGameComponent} from "../middleware/GamesService";
import Tictactoe from "../games/Tictactoe.vue";
import Rpsls from "../games/Rpsls.vue";
import RoomAdmin from "../components/RoomAdmin.vue"
import RoomPlayers from "../components/RoomPlayers.vue"
import RoomChat from "@/components/RoomChat.vue";

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
  },
  components: {
    Tictactoe,
    Rpsls,
    RoomAdmin,
    RoomPlayers,
    RoomChat
  },
  setup() {
    return {
      getGameComponent
    };
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
          const passwordGuess = prompt("Podaj hasło do pokoju");
          joinRoom(passwordGuess);
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
