import { ARR_CARDS_ACTION, BUY_TICKET_ACTION, EVENT_PAGE_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState, RootStateTicket } from './store';

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // const storeData = getState();
    const response = await axios.get('http://localhost:5000/events');

    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.events });
  };
};

export const fetchEventPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // const storeData = getState();
    const response = await axios.get(`http://localhost:5000/events/${id}`);

    dispatch({ type: EVENT_PAGE_ACTION, eventCard: response.data.event });
  };
};

export const fetchBuytPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootStateTicket) => {
    const storeData = getState();
    console.log(storeData);
    const response = await axios.get(`http://localhost:5000/events/${id}`);
    // const responseTicket = await axios.post(`localhost:5000/tickets/create/${id}`);
    console.log('response', response);

    dispatch({ type: BUY_TICKET_ACTION, form: response.data.tickets });
  };
};
