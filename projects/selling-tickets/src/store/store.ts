import { createStore } from 'redux';

const INITIAL_STATE = {
  formData: {
    dateFrom: '',
    dateTo: '',
    search: '',
    event: '',
  },
};

// @ts-ignore
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'form/filter':
      return {
        ...state,
        formData: action.form,
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
