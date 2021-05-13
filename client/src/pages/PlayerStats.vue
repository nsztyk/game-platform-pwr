<template>
  <div>
    <h2>STATISTICS</h2>
    {{ statistics }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getStatistics } from "../middleware/TokenService";

export default defineComponent({
  name: "PlayerStats",
  data() {
    return {
      statistics: {},
    };
  },
  async created() {
    this.statistics = await getStatistics();
  },
});
</script>

<style></style>
