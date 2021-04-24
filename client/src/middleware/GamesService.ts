import { ref, computed, reactive } from 'vue';
import { selectGameToPlay } from "./SocketConnection"

export enum AvaliableGames {
  'tictactoe' = 'Tictactoe',
}
const tictactoeState = [" ", " ", " ", " ", " ", " ", " ", " ", " "]



const gamesToPlay = ref<AvaliableGames[]>([AvaliableGames.tictactoe])
export let gameState = reactive<string[]>([])
export const gameComponent = ref<AvaliableGames>()



export const chooseGame = (gameName: AvaliableGames) => {
  selectGameToPlay(gameName)
}

export const move = () => {
  return ''
}

export const initGame = (gameName: AvaliableGames) => {
  switch (gameName) {
    case AvaliableGames.tictactoe:
      gameState = tictactoeState
      break;
    default:
      break;
  }
  gameComponent.value = gameName;
}

export const exitGame = () => {
  gameComponent.value = undefined
}

export const getGames = computed(() => gamesToPlay.value)
export const getGameComponent = computed(() => gameComponent.value)
export const getGameState = computed(() => gameState)

