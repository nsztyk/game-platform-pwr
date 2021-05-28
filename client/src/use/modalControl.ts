import { ref, computed } from 'vue';

const createRoomModalState = ref(false)
const enterPasswordModalState = ref(false)
const isPasswordWrong = ref(false)



export const hideCreateRoomModal = () => {
  createRoomModalState.value = false
}

export const showCreateRoomModal = () => {
  createRoomModalState.value = true
}


export const setPasswordWrong = () => {
  isPasswordWrong.value = true
}

export const setPasswordCorrect = () => {
  isPasswordWrong.value = false
}

export const hideEnterPasswordModal = () => {
  enterPasswordModalState.value = false
}

export const showEnterPasswordModal = () => {
  enterPasswordModalState.value = true
}


export const isCreateRoomModalVisible = computed(() => createRoomModalState.value)
export const isEnterPasswordModalVisible = computed(() => enterPasswordModalState.value)
export const isPassWrong = computed(() => isPasswordWrong.value)