import axios from 'axios';
import { Dispatch } from 'redux';
// import { STATE_TYPE } from './reducer';

export const GET_TODAYS_EVENTS_FROM_BD = 'GET_TODAYS_EVENTS_FROM_BD' as const;
export const GET_EVENT_DATA_BY_ID = 'GET_EVENT_DATA_BY_ID' as const;
export const GET_EVENTS_DATA_FROM_BD_ERROR = 'GET_EVENTS_DATA_FROM_BD_ERROR' as const;
export const CHECK_EVENT_TICKET = 'CHECK_EVENT_TICKET' as const;

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/events?type=today');
      dispatch({ type: GET_TODAYS_EVENTS_FROM_BD, data: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_EVENTS_DATA_FROM_BD_ERROR, error: err });
    }
  };
};

export const getEventById = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`);
      dispatch({ type: GET_EVENT_DATA_BY_ID, data: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_EVENTS_DATA_FROM_BD_ERROR, error: err });
    }
  };
};

export const checkEventTicket = (eventId: string, ticketId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`);
      dispatch({ type: GET_EVENT_DATA_BY_ID, data: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_EVENTS_DATA_FROM_BD_ERROR, error: err });
    }
  };
};
