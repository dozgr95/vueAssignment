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
  createToDo(state: AppState, todo: Todo) {
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
  saveLoadedTodos(state: AppState, todos: Todo[]) {
    state.todos = todos;
  },
};

export const actions = {
  loadStorage({ commit }: {commit: Function}) {
    const storage: string|null = localStorage.getItem('vue-app-todos');
    const todos: Todo[] = storage ? JSON.parse(storage) : [];
    commit('saveLoadedTodos', todos);
  },
  addTodo({ state, commit }: {state: AppState; commit: Function}, title: string) {
    const todo: Todo = {
      id: Guid.create().toString(),
      title,
      done: false,
    };
    commit('createToDo', todo);
    localStorage.setItem('vue-app-todos', JSON.stringify(state.todos));
  },
};

export default new Vuex.Store({
  state: baseState,
  mutations,
  getters,
  actions,
  modules: {
  },
});
