<template>
  <div class="pt-10">
    <div
      class="flex items-center justify-center custom-shadow bg-gray-900 w-1/3 mx-auto text-3xl mb-6 py-2"
    >
      <h2 class="mr-4">Statistics</h2>
      <img src="../assets/Futures.png" alt="Statistic icon" />
    </div>
    <div class="custom-shadow bg-gray-900 w-1/3 mx-auto p-4">
      <div
        id="wrapper"
        class="grid grid-cols-3 justify-between mx-auto text-2xl rounded-lg py-3"
        v-if="loaded"
      >
        <div class="ml-10 mb-6">Game</div>
        <div class="justify-self-center">Players</div>
        <div class="justify-self-center">Record</div>

        <div class="ml-10 mb-12">TicTacToe</div>

        <statistics-base-row
          :win="statistics.tictactoe.win"
          :draw="statistics.tictactoe.draw"
          :lose="statistics.tictactoe.lose"
          num="2"
        />
        

        <div class="ml-10">RPSLS</div>
        <statistics-base-row
          :win="statistics.rpsls.twoPlayers.win"
          :draw="statistics.rpsls.twoPlayers.draw"
          :lose="statistics.rpsls.twoPlayers.lose"
          num="2"
        />

        <statistics-base-row
          :win="statistics.rpsls.threePlayers.win"
          :draw="statistics.rpsls.threePlayers.draw"
          :lose="statistics.rpsls.threePlayers.lose"
          num="3"
        />

        <statistics-base-row
          :win="statistics.rpsls.fourPlayers.win"
          :draw="statistics.rpsls.fourPlayers.draw"
          :lose="statistics.rpsls.fourPlayers.lose"
          num="4"
        />

      

        <div class="col-start-2 col-end-4 border-t-2 mb-3 mr-6"></div>
        <statistics-base-row
          :win="statistics.rpsls.twoPlayers.win + statistics.rpsls.threePlayers.win + statistics.rpsls.fourPlayers.win"
          :draw="statistics.rpsls.twoPlayers.draw + statistics.rpsls.threePlayers.draw + statistics.rpsls.fourPlayers.draw"
          :lose="statistics.rpsls.twoPlayers.lose + statistics.rpsls.threePlayers.lose + statistics.rpsls.fourPlayers.lose"
          num=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getStatistics } from "../middleware/TokenService";
import StatisticsBaseRow from "../components/StatisticsBaseRow";

export default defineComponent({
  name: "PlayerStats",
  components: {
    StatisticsBaseRow,
  },
  data() {
    return {
      loaded: false,
      statistics: {
        tictactoe: {
          win: 0,
          lose: 0,
          draw: 0,
        },
        rpsls: {
          twoPlayers: {
            win: 0,
            lose: 0,
            draw: 0,
          },
          threePlayers: {
            win: 0,
            lose: 0,
            draw: 0,
          },
          fourPlayers: {
            win: 0,
            lose: 0,
            draw: 0,
          },
        },
      },
    };
  },
  created() {
    getStatistics().then((stats) => {
      this.statistics = stats;
      this.loaded = true;
    });
  },
});
</script>

<style scoped>
#wrapper {
  background-color: #0b111e;
}
</style>
