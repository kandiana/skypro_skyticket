import { arrCards, EventDataShort } from '../components/CardsContainer/CardsContainer';
import { FormType } from '../pages/MainPage/MainPage';
import { ARR_CARDS_ACTION, FORM_FILTER_ACTION, RootAction } from './actions';

type STATE = {
  formData: FormType;
  cardsData?: EventDataShort[];
};

const INITIAL_STATE = {
  formData: {
    dateFrom: '',
    dateTo: '',
    search: '',
    event: '',
  },
};

export function reducer(state: STATE = INITIAL_STATE, action: RootAction) {
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
