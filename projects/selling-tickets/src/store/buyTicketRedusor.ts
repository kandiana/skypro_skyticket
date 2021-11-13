import { BuyTicketType } from '../pages/MainPage/MainPage';
import { BUY_TICKET_ACTION, RootAction } from './actions';

const defaultState: BuyTicketType = [
  {
    _id: '',
    eventId: '',
    buyer: '',
    ticket: [],
  },
];

export const ticketBuyRedusor = (state = defaultState, action: RootAction) => {
  switch (action.type) {
    case BUY_TICKET_ACTION:
      const allBuyCards = [];

      for (let i = 0; i < action.formTicket.length; i++) {
        allBuyCards.push(action.formTicket[i]._id);
      }
      return {
        id: action.formTicket[0].eventId,
        buyer: action.formTicket[0].buyer,
        ticket: [...allBuyCards],
      };
    default:
      return state;
  }
};
