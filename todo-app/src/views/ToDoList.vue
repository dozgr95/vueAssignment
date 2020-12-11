<template>
  <div class="to-do-list">
    <div class="creation">
      <v-text-field
        :value=todoTitle
        @input=updateTitle
        label="Neues Todo definieren"
        filled
        dense
        >
      </v-text-field>
      <v-btn
        height=52
        outlined
        @click=createTodo
      >
      +
      </v-btn>
    </div>

    <div v-for="todo in getTodos()" :key="todo.id" class="list">
      {{ todo.title }}
      <v-checkbox
        :value="todo.done"
        @click="checkDone(todo.id)"
      >
      </v-checkbox>
      <v-btn
        outlined
        @click=deleteTodo
      >
       X
      </v-btn>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ToDoList extends Vue {
  public todoTitle = ''

  public updateTitle(e: string) {
    this.todoTitle = e;
  }

  public createTodo() {
    if (this.todoTitle !== '') {
      this.$store.commit('createTodo', this.todoTitle);
      this.todoTitle = '';
    }
    this.$store.dispatch('updateStorage');
  }

  public getTodos() {
    return this.$store.state.todos;
  }

  public deleteTodo = (id: string) => {
    this.$store.commit('deleteTodo', id);
    this.$store.dispatch('updateStorage');
  }

  public checkDone(id: string) {
    this.$store.commit('setDone', id);
    this.$store.dispatch('updateStorage');
  }
}
</script>

<style lang="scss" scoped>
  .to-do-list {
    display:flex;
    flex-direction: column;
  }
  .creation {
    display: flex;
  }
  .list {
    display: flex;
    justify-content: space-between;
    height: px;
  }
</style>
