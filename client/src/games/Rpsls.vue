<template>
  <div class="custom-shadow bg-gray-900">
    <div v-if="!gameStarted">
      <img src="../assets/rpslsRules.png" alt="rpsls rules" />
    </div>
    <div v-if="gameStarted" class="p-3 text-lg text-center">
      <div class="flex justify-evenly">

      <label>
        Your choice: 
        <span class="ml-2">
          <i>{{chosenFigure}}</i>
        </span>
      </label>
      <label
        type="button"
        class="border-2 border-gray-200 rounded-lg px-4 outline-none cursor-pointer ml-8"
        :class="{'disabled' : isDisabled}"
        @click="makeMove"
        >Confirm</label
      >
      </div>
      <div>
        <img class="rpslsIcon" src="../assets/spock.png" alt="Spock icon" @click="chosenFigure = 'spock'" />
        <img class="rpslsIcon" src="../assets/lizard.png" alt="Lizard icon" @click="chosenFigure = 'lizard'" />
        <img class="rpslsIcon" src="../assets/scissors.png" alt="Scissors icon" @click="chosenFigure = 'scissors'" />
        <img class="rpslsIcon" src="../assets/rock.png" alt="Rock icon" @click="chosenFigure = 'rock'"/>
        <img class="rpslsIcon" src="../assets/paper.png" alt="Paper icon" @click="chosenFigure = 'paper'"/>
      </div>
    </div>
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { gameStarted, move } from "../middleware/GamesService";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Tictactoe",
  setup() {
    const chosenFigure = ref("---------")
    const makeMove = () => {
      move(chosenFigure.value);
    };
    const isDisabled = computed(() => {
      const options = ['scissors', 'paper', 'rock', 'lizard', 'spock']
      return !options.includes(chosenFigure.value)
    }) 
    return {
      makeMove,
      gameStarted,
      chosenFigure,
      isDisabled
    };
  },
});
</script>

<style scoped>
.rpslsIcon {
  width: 150px;
  height: 150px;
  display: inline-flex;
  margin: 1rem;
  transition: transform .2s ease-in-out;
  cursor: pointer;
}

.rpslsIcon:hover {
  transform: scale(1.1)
}

.disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
