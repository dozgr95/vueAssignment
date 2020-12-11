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
    <div class="header">
      <div class="title-head">
        ToDo
      </div>
      <div class="done-head">
        Done
      </div>
      <div class="delete-head">
        Delete
      </div>
    </div>
    <div v-for="todo in getTodos()" :key="todo.id" class="list">
      <div class="title">
        {{ todo.title }}
      </div>
      <v-checkbox
        :value="todo.done"
        @click="checkDone(todo.id)"
      >
      </v-checkbox>
      <v-btn
        outlined
        height=25
        width=25
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
  .header{
    display: flex;
    justify-content: space-between;
    border-bottom: black 2px solid;
    padding: 10px;
    font-weight: bold;
  }
  .list {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 10px;
    border-bottom: grey 1px solid;
    .v-btn {
      min-width: 25px!important;
    }
    .v-input--selection-controls{
      padding: 0!important;
      margin: 0!important;
    }
  }
</style>
