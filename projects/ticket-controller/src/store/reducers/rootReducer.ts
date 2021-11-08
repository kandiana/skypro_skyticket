import { combineReducers } from 'redux';
import { eventsReducer } from './events';
import { ticketsReducer } from './tickets';

export default combineReducers({
  events: eventsReducer,
  tickets: ticketsReducer,
});
