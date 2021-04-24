import { ref, computed } from 'vue';
import { selectGameToPlay } from "./SocketConnection"

export enum AvaliableGames {
  'tictactoe' = 'tictactoe'
}

const games = ref<AvaliableGames[]>([AvaliableGames.tictactoe])


export const getGames = computed(() => games.value)

export const chooseGame = (gameName: AvaliableGames) => {
  selectGameToPlay(gameName)
}