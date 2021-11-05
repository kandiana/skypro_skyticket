import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
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
      const newArrCards = [];

      for (let i = 0; i < arrCards.length; i++) {
        newArrCards.push(arrCards[i]);
      }

      return {
        ...state,
        // console: console.log('Пришли из CardsConteiner'),
        cardsData: [...newArrCards],
      };

    case 'array/post':
      const fetchBuilds = async () => {
        // return async () => {
          const response = await axios.get('http://localhost:5000/ping/');
          console.log(response)
        // };
      };

      return {
        ...state,
        postData: fetchBuilds(),
      };

    default:
      return state;
  }
}

export const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
