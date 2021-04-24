import { ref, computed } from 'vue';
import { selectGameToPlay } from "./SocketConnection"

export enum AvaliableGames {
  'tictactoe' = 'Tictactoe',
}

const gamesToPlay = ref<AvaliableGames[]>([AvaliableGames.tictactoe])

export const gameState = ref([])
export const gameComponent = ref<AvaliableGames>()

export const chooseGame = (gameName: AvaliableGames) => {
  selectGameToPlay(gameName)
}

export const initGame = (gameName: AvaliableGames) => {
  gameComponent.value = gameName;
}

export const exitGame = () => {
  gameComponent.value = undefined
}

export const getGames = computed(() => gamesToPlay.value)
export const getGameComponent = computed(() => gameComponent.value)
