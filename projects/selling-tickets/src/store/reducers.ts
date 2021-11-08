import { EventDataShort } from '../components/CardsContainer/CardsContainer';
import { FormType } from '../pages/MainPage/MainPage';
import { ARR_CARDS_ACTION, EVENT_PAGE_ACTION, FORM_FILTER_ACTION, RootAction } from './actions';


type STATE = {
  formData: FormType;
  cardsData?: EventDataShort[]; // [{}, {}, {}] это карточки для отображения на главной странице
  cardData?: EventDataShort[]; // {} Данные для отображения конкретной страницы
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

      for (let i = 0; i < action.eventCards.length; i++) {
        newArrCards.push(action.eventCards[i]);
      }

      console.log(newArrCards)
      return {
        ...state,
        cardsData: [...newArrCards],
      };

    case EVENT_PAGE_ACTION:
      const arrEventPage = [action.eventCard]
      console.log(arrEventPage)

      return {
        ...state,
        cardData: action.eventCard, // cardsData: [{ id: 1 }, { id: 2 }] -> [{ id: 1 }]
      };

    default:
      return state;
  }
}
