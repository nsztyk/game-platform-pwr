<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    v-if="isEnterPasswordModalVisible"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0 "
    >
      <div class="fixed inset-0 bg-gray-800 bg-opacity-75"></div>
      <div
        class="inline-block bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle text-lg"
      >
        <div class="bg-gray-900 text-gray-200 px-5 py-2">
          <div class="items-start">
            <div class="mt-3 text-center">
              <h3 class="leading-6 font-medium mb-5 text-xl">
                Enter room password
              </h3>
              <div class="flex justify-around">
                <label for="roomPassword" class="ml-1 mr-4">Password:</label>
                <input
                  type="password"
                  name="roomPassword"
                  id="roomPassword"
                  class="pl-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-gray-100"
                  v-model="roomPassword"
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="isPassWrong" class="text-red-500 text-center text-sm">
            Wrong password, try again!
          </div>
        <div class="bg-gray-900 py-3 px-6 flex flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-2 bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-3 w-auto text-sm"
            @click="handleEnterPassword"
          >
            Enter
          </button>
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 mt-0 ml-3 w-auto text-sm"
            @click="handleQuitRoom"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { joinRoom } from "@/middleware/SocketConnection";
import router from "@/router";
import { defineComponent, ref } from "vue";
import {
  hideEnterPasswordModal,
  isEnterPasswordModalVisible,
  isPassWrong,
  setPasswordCorrect,
} from "../use/modalControl";
export default defineComponent({
  setup() {
    const roomPassword = ref("");
    const handleEnterPassword = () => {
      setPasswordCorrect()
      joinRoom(roomPassword.value);
      roomPassword.value = ""
      hideEnterPasswordModal();
    };
    const handleQuitRoom = () => {
      hideEnterPasswordModal();
      setPasswordCorrect()
      router.push({ name: "Game" });
    };
    return {
      isEnterPasswordModalVisible,
      roomPassword,
      handleEnterPassword,
      handleQuitRoom,
      isPassWrong,
    };
  },
});
</script>
