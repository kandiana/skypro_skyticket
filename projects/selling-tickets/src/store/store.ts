import { createStore } from 'redux';

// @ts-ignore
function counterReducer(state = { value: 0 }, action) {
  
  switch (action.type) {
    case 'counter/incremented':
      return { value: action.form };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

export const store = createStore(counterReducer);

store.subscribe(() => 
console.log(store.getState())
);
