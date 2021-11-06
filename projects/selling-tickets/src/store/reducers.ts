import { arrCards } from '../components/CardsContainer/CardsContainer';
import { ARR_CARDS_ACTION, FORM_FILTER_ACTION, RootAction } from './actions';

const INITIAL_STATE = {
  formData: {
    dateFrom: '',
    dateTo: '',
    search: '',
    event: '',
  },
};

export function reducer(state = INITIAL_STATE, action: RootAction) {
  switch (action.type) {
    case FORM_FILTER_ACTION:
      return {
        ...state,
        formData: action.form,
      };
    case ARR_CARDS_ACTION:
      const newArrCards = [];

      for (let i = 0; i < arrCards.length; i++) {
        newArrCards.push(arrCards[i]);
      }

      return {
        ...state,
        cardsData: [...newArrCards],
      };

    default:
      return state;
  }
}
