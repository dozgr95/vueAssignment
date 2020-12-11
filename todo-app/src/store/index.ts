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
  createTodo(state: AppState, title: string) {
    const todo: Todo = {
      id: Guid.create().toString(),
      title,
      done: false,
    };
    state.todos.push(todo);
  },
  deleteTodo(state: AppState, id: string) {
    const itemId = state.todos.findIndex((todo) => todo.id === id);
    state.todos.splice(itemId, 1);
  },
  setDone(state: AppState, id: string) {
    const itemId = state.todos.findIndex((todo) => todo.id === id);
    if (itemId > -1) {
      const todo = state.todos[itemId];
      todo.done = !todo.done;
      Object.assign(state.todos[itemId], todo);
    }
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
  updateStorage({ state }: {state: AppState; commit: Function}) {
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
