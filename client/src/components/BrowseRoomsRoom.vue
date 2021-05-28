<template>
  <div id="wrapper" class="grid grid-cols-4 w-full items-center py-3 px-1 text-center bg-gray-900 text-xl lg:text-2xl" style="min-height: 100px" :class="borderTop">
    <div>
      {{ roomName }}
    </div>
    <div v-if="roomGame">
      {{ roomGame }}
    </div>
    <div v-else>
      -----------
    </div>
    <div>
      <img class="mx-auto" :src="imgSrc" alt="" />
    </div>
    <div class="flex flex-col">
      <template v-for="player in roomPlayers" :key="player">
        <div>
          {{ player }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RoomInfo",
  props: {
    roomName: {
      type: String,
      required: true,
    },
    roomGame: {
      required: true,
    },
    roomHasPassword: {
      type: Boolean,
    },
    roomPlayers: {
      type: Array,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    }
  },
  computed: {
    imgSrc() {
      if (this.roomHasPassword)
        return require(`@/assets/PadlockR.png`)
      return  require(`@/assets/PadlockG.png`)
    },
    borderTop(){
      if (this.position > 0)
        return 'border-t-2 border-gray-600'
      return ''
    }
  }
});
</script>

<style scoped>
  #wrapper:hover {
    background-color: #0B111E;
  }
</style>