import { getters, Todo } from '../../src/store';

const { donePercentage } = getters;

describe('getter donePercentage', () => {
  it('should return 0 and not nAn', () => {
    const state = {
      todos: [],
    };
    const result = donePercentage(state);
    expect(result).toEqual(0);
  });
  it('should return 0 when none are done', () => {
    const state = {
      todos: [
            {
              id: 'someId',
              title: 'Here is the title of done Todo',
              done: false,
            } as Todo,
      ],
    };
    const result = donePercentage(state);
    expect(result).toEqual(0);
  });
  it('should return 100 all are done', () => {
    const state = {
      todos: [
            {
              id: 'someId',
              title: 'Here is the title of done Todo',
              done: true,
            } as Todo,
      ],
    };
    const result = donePercentage(state);
    expect(result).toEqual(100);
  });
});
