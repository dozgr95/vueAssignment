<template>
  <div class="percentage">
    <h3>Done:</h3>
    <v-progress-linear
      value="getDonePercentage"
      height="25"
    >
      <strong>{{ Math.ceil(getDonePercentage)}}%</strong>
    </v-progress-linear>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class Percentage extends Vue {
  public get getDonePercentage() {
    return this.$store.getters.donePercentage;
  }
}
</script>

<style lang="scss" scoped>
  .percentage {
    margin: 20px 0;
    display:flex;
  }
  .v-progress-linear {
    margin-left: 10px;
    border: black 1px solid;
  }
</style>
