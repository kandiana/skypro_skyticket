import { BuyTicketType } from '../pages/MainPage/MainPage';
import { BUY_TICKET_ACTION, RootAction } from './actions';

const defaultState: BuyTicketType = {
  id: '',
  name: '',
  ticket: [],
};

export const ticketBuyRedusor = (state = defaultState, action: RootAction) => {
  switch (action.type) {
    case BUY_TICKET_ACTION:
      return {
        ...state,
        formTicket: action.formTicket,
      };
    default:
      return state;
  }
};
