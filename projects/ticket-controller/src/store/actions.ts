import axios from 'axios';
import { Dispatch } from 'redux';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACK_URL
    : process.env.REACT_APP_BACK_URL_LOCAL;

export const GET_TODAYS_EVENTS_FROM_BD = 'GET_TODAYS_EVENTS_FROM_BD' as const;
export const GET_EVENT_DATA_BY_ID = 'GET_EVENT_DATA_BY_ID' as const;
export const GET_EVENTS_DATA_FROM_BD_ERROR = 'GET_EVENTS_DATA_FROM_BD_ERROR' as const;

export const CHECK_EVENT_TICKET = 'CHECK_EVENT_TICKET' as const;
export const CHECK_EVENT_TICKET_ERROR = 'CHECK_EVENT_TICKET_ERROR' as const;
export const CHECK_EVENT_TICKET_REQUEST_ERROR = 'CHECK_EVENT_TICKET_REQUEST_ERROR' as const;
export const RESET_TICKETS_DATA = 'RESET_TICKETS_DATA' as const;

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/events?type=today`);
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
      const response = await axios.get(`${BACKEND_URL}/events/${id}`);
      dispatch({ type: GET_EVENT_DATA_BY_ID, data: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_EVENTS_DATA_FROM_BD_ERROR, error: err });
    }
  };
};

export type checkEventTicketProps = {
  eventId: string;
  ticketId: string;
};

export const checkEventTicket = (data: checkEventTicketProps) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/tickets/${data.ticketId}/check`, {
        eventId: data.eventId,
      });

      switch (response.data.status) {
        case 'ok':
          dispatch({ type: CHECK_EVENT_TICKET, data: response.data, eventId: data.eventId });
          break;

        default:
          dispatch({ type: CHECK_EVENT_TICKET_ERROR, data: response.data });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: CHECK_EVENT_TICKET_REQUEST_ERROR, error: err });
    }
  };
};

export const resetTicketsData = () => {
  return { type: RESET_TICKETS_DATA };
};
