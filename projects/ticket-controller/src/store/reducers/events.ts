import { AnyAction } from 'redux';
import { FILTER_EVENTS, GET_EVENTS_FROM_BD } from '../actions/events';

export const eventsReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case FILTER_EVENTS:
      return state;
    case GET_EVENTS_FROM_BD:
      return state;
    default:
      return state;
  }
};
