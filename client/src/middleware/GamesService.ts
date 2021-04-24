import { ref, computed } from 'vue';
import { selectGameToPlay, roomDetails, makeMove } from "./SocketConnection"
import { getUsername } from './TokenService'

export enum AvaliableGames {
  'tictactoe' = 'Tictactoe',
}



const gamesToPlay = ref<AvaliableGames[]>([AvaliableGames.tictactoe])
export const gameComponent = ref<AvaliableGames>()



export const chooseGame = (gameName: AvaliableGames) => {
  selectGameToPlay(gameName)
}

export const move = (field: string) => {
  makeMove(field)
}

export const initGame = (gameName: AvaliableGames) => {
  gameComponent.value = gameName;
}

export const exitGame = () => {
  gameComponent.value = undefined
}

export const isMyTurn = computed(() => {
  const roomInfo = roomDetails
  if (roomInfo.value && roomInfo.value.playersMoveOrder && roomInfo.value.playersMoveOrder.length) {
    return roomInfo.value.playersMoveOrder[0] === getUsername()
  }
  return false
})

export const getGames = computed(() => gamesToPlay.value)
export const getGameComponent = computed(() => gameComponent.value)
export const getGameState = computed(() => roomDetails.value.gameState.board)
export const getWinner = computed(() => roomDetails.value.gameState.winner)

