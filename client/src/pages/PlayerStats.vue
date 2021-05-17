<template>
  <div class="container mx-auto">
    <h2 class="text-4xl mb-6 text-center">STATISTICS</h2>
    <router-link :to="{ name: 'Game' }">Go back</router-link>
    <div class="grid grid-cols-3 justify-between mx-auto w-1/2" v-if="loaded">
      <div class="text-2xl">Num of players</div>
      <div class="text-3xl">TicTacToe</div>
      <div class="text-3xl">RPSLS</div>
      <div class="text-3xl">2</div>

      <div class="text-3xl ml-2">
        <span class="text-green-600">{{ statistics.tictactoe.win }} </span>
        <span> / </span>
        <span class="text-yellow-600">{{ statistics.tictactoe.draw }} </span>
        <span> / </span>
        <span class="text-red-600">{{ statistics.tictactoe.lose }} </span>
      </div>
      <div class="text-3xl">
        <span class="text-green-600"
          >{{ statistics.rpsls.twoPlayers.win }}
        </span>
        <span> / </span>
        <span class="text-yellow-600"
          >{{ statistics.rpsls.twoPlayers.draw }}
        </span>
        <span> / </span>
        <span class="text-red-600"
          >{{ statistics.rpsls.twoPlayers.lose }}
        </span>
      </div>
      <div class="text-3xl">
        3
      </div>
      <div class="text-3xl col-start-3 col-end-3">
        <span class="text-green-600"
          >{{ statistics.rpsls.threePlayers.win }}
        </span>
        <span> / </span>
        <span class="text-yellow-600"
          >{{ statistics.rpsls.threePlayers.draw }}
        </span>
        <span> / </span>
        <span class="text-red-600"
          >{{ statistics.rpsls.threePlayers.lose }}
        </span>
      </div>
      <div class="text-3xl">
        4
      </div>
      <div class="text-3xl col-start-3 col-end-3">
        <span class="text-green-600"
          >{{ statistics.rpsls.fourPlayers.win }}
        </span>
        <span> / </span>
        <span class="text-yellow-600"
          >{{ statistics.rpsls.fourPlayers.draw }}
        </span>
        <span> / </span>
        <span class="text-red-600"
          >{{ statistics.rpsls.fourPlayers.lose }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getStatistics } from "../middleware/TokenService";

export default defineComponent({
  name: "PlayerStats",
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
  created(){
    getStatistics().then((stats) => {
      this.statistics = stats
      this.loaded = true
    })
  }
});
</script>

<style></style>
