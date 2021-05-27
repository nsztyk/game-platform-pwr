<template>
  <div class="custom-shadow bg-gray-900 col-span-2 p-3"
  :class="{'self-stretch' : strechComponent}">
    <div class="wrapper rounded-lg px-4 py-2 flex justify-between mb-4">
      <input
        type="text"
        placeholder="Message"
        v-model="messageText"
        class="bg-transparent border-b-2 border-gray-200 outline-none"
      />
      <label
        type="button"
        @click="sendMessageToOthers"
        class="border-2 border-gray-200 rounded-lg px-4 outline-none cursor-pointer"
        :class="{'disabled' : isDisabled}"
        >Send</label
      >
    </div>
    <div class="wrapper rounded-lg px-4 py-2" v-if="getMessages.length">
      <ul>
        <li v-for="(message, index) in getMessages" :key="index" class="leading-relaxed">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { getCurrGameDetails, getMessages, sendMessage } from "../middleware/SocketConnection";
export default defineComponent({
  setup() {
    const messageText = ref("");

    const sendMessageToOthers = () => {
      if (messageText.value.length) sendMessage(messageText.value);
      messageText.value = "";
    };
    const strechComponent = computed(() => !getCurrGameDetails.value || !getCurrGameDetails.value.players.length )
    const isDisabled = computed(() => !messageText.value.length);

    return {
      getMessages,
      sendMessageToOthers,
      isDisabled,
      messageText,
      strechComponent
    };
  },
});
</script>

<style scoped>
.wrapper {
  background-color: #0b111e;
}

.disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
