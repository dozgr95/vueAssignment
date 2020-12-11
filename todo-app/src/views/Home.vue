<template>
  <div class="home">
    <div class="title">
      <h2>What do you have ToDo?</h2>
    </div>
    <ToDoList />
    <Percentage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoList from './Percentage.vue';
import Percentage from './ToDoList.vue';

@Component({
  components: {
    ToDoList,
    Percentage,
  },
})
export default class Home extends Vue {
  public mounted() {
    this.$store.dispatch('loadStorage');
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex: 0 0 80%;
    flex-direction: column;
    text-align: center;
    .title {
      text-align: center;
    }
  }
</style>
