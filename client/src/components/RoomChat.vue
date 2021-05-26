<template>
  <div class="custom-shadow bg-gray-900 col-span-2">
    <input type="text" placeholder="message" v-model="messageText" />
    <button @click="sendMessageToOthers">Send</button>
    <div>
      <ul>
        <li v-for="(message, index) in getMessages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getMessages, sendMessage } from "../middleware/SocketConnection";
export default defineComponent({
  setup() {
    return {
      getMessages,
    };
  },
  data(){
    return {
      messageText: ""
    }
  },
  methods: {
    sendMessageToOthers() {
      sendMessage(this.messageText);
      this.messageText = "";
    },
  },
});
</script>
