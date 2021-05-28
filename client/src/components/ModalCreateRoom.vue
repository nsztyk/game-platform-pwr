<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    v-if="isCreateRoomModalVisible"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 bg-gray-800 bg-opacity-75 "></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-gray-200">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-xl leading-6 font-medium">
                Create a new room
              </h3>
              <div class="sm:flex mt-6 text-left text-lg ">
                <div class="sm:mr-5">
                  <div>
                    <label for="roomName" class="blockfont-medium ml-1"
                      >Name</label
                    >
                    <div class="mt-1 relative rounded-md shadow-sm"></div>
                    <input
                      type="text"
                      name="roomName"
                      id="roomName"
                      class="block w-full pr-6 text-base py-1 pl-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-gray-100"
                      placeholder="TicTacToeRoom"
                      v-model="roomName"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-5">
                  <div>
                    <label for="roomPassword" class="blockfont-mediumml-1"
                      >Password</label
                    >
                    <div class="mt-1 relative rounded-md shadow-sm"></div>
                    <input
                      type="password"
                      name="roomPassword"
                      id="roomPassword"
                      class="block w-full pr-6 text-base py-1 pl-1 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-gray-100"
                      placeholder="Leave for no password"
                      v-model="roomPassword"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="handleCreatingRoom"
          >
            Create
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="hideCreateRoomModal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  isCreateRoomModalVisible,
  hideCreateRoomModal,
} from "../use/modalControl";
import { createNewRoom } from "@/middleware/SocketConnection";

export default defineComponent({
  name: "ModalCreateRoom",
  setup() {
    const roomName = ref("");
    const roomPassword = ref("");
    const handleCreatingRoom = () => {
      createNewRoom(roomName.value, roomPassword.value);
      hideCreateRoomModal();
    };
    return {
      isCreateRoomModalVisible,
      hideCreateRoomModal,
      handleCreatingRoom,
      roomName,
      roomPassword,
    };
  },
});
</script>
