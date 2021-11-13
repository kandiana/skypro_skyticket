import { ARR_CARDS_ACTION, BUY_TICKET_ACTION, EVENT_PAGE_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from './store';

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState['reducer']) => {
    // const storeData = getState();
    const response = await axios.get('http://localhost:5000/events');

    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.events });
  };
};

export const fetchEventPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState['reducer']) => {
    // const storeData = getState();
    const response = await axios.get(`http://localhost:5000/events/${id}`);

    dispatch({ type: EVENT_PAGE_ACTION, eventCard: response.data.event });
  };
};

export const fetchBuytPage = (id: string, number: string, buyerName: string) => {
  return async (dispatch: Dispatch, getState: () => RootState['ticketBuyRedusor']) => {
    const response = await axios.post('http://localhost:5000/tickets/create', {
      eventId: id,
      number: number,
      buyer: buyerName,
    });
    console.log('RESPONSE PORT::::::::', response);
    dispatch({ type: BUY_TICKET_ACTION, formTicket: response.data.tickets });
  };
};
