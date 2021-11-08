import { AnyAction } from 'redux';
import { CHECK_TICKET } from '../actions/tickets';

export const ticketsReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case CHECK_TICKET:
      return state;
    default:
      return state;
  }
};
