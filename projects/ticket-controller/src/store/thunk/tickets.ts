import axios from 'axios';
import { Dispatch } from 'redux';
import {
  checkTicketError,
  checkTicketRequestError,
  checkTicketStart,
  checkTicketSuccess,
  resetTicketsData,
} from '../actions';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACK_URL
    : process.env.REACT_APP_BACK_URL_LOCAL;

export type checkEventTicketProps = {
  eventId: string;
  ticketId: string;
};

let timer: ReturnType<typeof setTimeout>;

export const checkEventTicket = (data: checkEventTicketProps) => {
  clearTimeout(timer);

  return async (dispatch: Dispatch) => {
    dispatch(checkTicketStart());

    try {
      const response = await axios.put(`${BACKEND_URL}/tickets/${data.ticketId}/check`, {
        eventId: data.eventId,
      });

      switch (response.data.status) {
        case 'ok':
          dispatch(checkTicketSuccess(response.data, data.eventId));
          break;

        default:
          dispatch(checkTicketError(response.data));
      }
    } catch (err) {
      console.log(err);

      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      dispatch(checkTicketRequestError(message));
    }

    timer = setTimeout(() => {
      dispatch(resetTicketsData());
    }, 5000);
  };
};
