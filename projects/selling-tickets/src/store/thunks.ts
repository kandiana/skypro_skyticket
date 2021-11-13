import { ARR_CARDS_ACTION, BUY_TICKETS_ACTION, EVENT_PAGE_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from './store';

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState['reducer']) => {
    const response = await axios.get('http://localhost:5000/events');
    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.events });
  };
};

export const fetchEventPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState['reducer']) => {
    const response = await axios.get(`http://localhost:5000/events/${id}`);
    dispatch({ type: EVENT_PAGE_ACTION, eventCard: response.data.event });
  };
};

export const fetchBuyPage = (id: string, number: string, buyerName: string) => {
  return async (dispatch: Dispatch, getState: () => RootState['tickets']) => {
    const response = await axios.post('http://localhost:5000/tickets/create', {
      eventId: id,
      number: number,
      buyer: buyerName,
    });
    dispatch({ type: BUY_TICKETS_ACTION, formTickets: response.data.tickets });
  };
};
