import { BuyTicketsType } from '../pages/MainPage/MainPage';
import { Reducer } from 'redux';
import { BUY_TICKETS_ACTION, RootAction } from './actions';

type TicketsState = Omit<BuyTicketsType, "_id">;

const defaultState: TicketsState = {
  eventId: '',
  buyer: '',
  ticket: [],
};

export const ticketBuyRedusor: Reducer<TicketsState, RootAction> = (state = defaultState, action: RootAction) => {
  switch (action.type) {
    case BUY_TICKETS_ACTION:
      const allBuyCards = [];

      for (let i = 0; i < action.formTickets.length; i++) {
        allBuyCards.push(action.formTickets[i]._id);
      }

      const rrr = {
        ...state,
        eventId: action.formTickets[0].eventId,
        buyer: action.formTickets[0].buyer,
        ticket: [...allBuyCards],
      };
      return rrr;
    default:
      return state;
  }
};
