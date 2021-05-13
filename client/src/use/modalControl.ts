import { ref, computed } from 'vue';

const modalState = ref(false)

export const hideModal = () => {
  modalState.value = false
}

export const showModal = () => {
  modalState.value = true
}

export const isModalVisible = computed(() => modalState.value)