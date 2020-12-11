import { mutations, Todo } from '../../src/store';

const { setDone } = mutations;

describe('mutation setDone', () => {
  it('should set to true', () => {
    const state = {
      todos: [
        {
          id: 'first',
          done: false,
        } as Todo,
      ],
    };
    setDone(state, 'first');
    expect(state.todos[0].done).toEqual(true);
  });
  it('should set to false', () => {
    const state = {
      todos: [
        {
          id: 'first',
          done: true,
        } as Todo,
      ],
    };
    setDone(state, 'first');
    expect(state.todos[0].done).toEqual(false);
  });
});
