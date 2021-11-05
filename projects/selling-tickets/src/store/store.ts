import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { arrCards } from '../components/CardsContainer/CardsContainer';

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
  console.log(action)
  switch (action.type) {
    case 'form/filter':
      return {
        ...state,
        formData: action.form,
      };
    case 'arr/cards':
      const newArrayCards = [];

      for(let i = 0; i < arrCards.length; i++) {
        newArrayCards.push(arrCards[i])
      }

      return {
        ...state,
        console: console.log('Пришли из CardsConteiner'),
        cardsData: [...newArrayCards]
      };
    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
