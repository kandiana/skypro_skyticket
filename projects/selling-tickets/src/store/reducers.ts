import { EventDataShort } from '../components/CardsContainer/CardsContainer';
import { FormType } from '../pages/MainPage/MainPage';
import { ARR_CARDS_ACTION, EVENT_PAGE_ACTION, FORM_FILTER_ACTION, RootAction } from './actions';

type STATE = {
  formData: FormType;
  cardsData?: EventDataShort[];
  cardData?: EventDataShort;
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
      const allArrCards=[];

      for (let i = 0; i < action.eventCards.length; i++) {
        allArrCards.push(action.eventCards[i]);
      }

      return {
        ...state,
        cardsData: [...allArrCards],
      };

    case EVENT_PAGE_ACTION:
      return {
        ...state,
        cardData: action.eventCard,
      };

    default:
      return state;
  }
}
