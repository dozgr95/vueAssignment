import Vue from 'vue';
import Vuex from 'vuex';
import { Guid } from 'guid-typescript';

Vue.use(Vuex);

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface AppState {
  todos: Todo[];
}

export const baseState = {
  todos: [],
} as AppState;

export const getters = {
  // return percentage (int without %) of todos that had been marked as done
  donePercentage(state: AppState) {
    if (state.todos.length > 0) {
      return (state.todos.filter((todo) => todo.done).length / state.todos.length) * 100;
    }
    return 0;
  },
};

export const mutations = {
  createToDo(state: AppState, title: string) {
    const todo: Todo = {
      id: Guid.create().toString(),
      title,
      done: false,
    };
    state.todos.push(todo);
  },
  deleteToDo(state: AppState, id: string) {
    const itemId = state.todos.findIndex((todo) => todo.id === id);
    state.todos.splice(itemId, 1);
  },
  markAsDone(state: AppState, id: string) {
    const itemId = state.todos.findIndex((todo) => todo.id === id);
    state.todos[itemId].done = true;
  },
};

export default new Vuex.Store({
  state: baseState,
  mutations,
  getters,
  actions: {
  },
  modules: {
  },
});
