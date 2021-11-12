import axios from 'axios';
import { Dispatch } from 'redux';
import { getEventByIdSuccess, getEventDataRequestError, getTodaysEventsSuccess } from '../actions';
import { STATE_TYPE } from '../store.types';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACK_URL
    : process.env.REACT_APP_BACK_URL_LOCAL;

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/events?type=today`);
      dispatch(getTodaysEventsSuccess(response.data));
    } catch (err) {
      console.log(err);

      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      dispatch(getEventDataRequestError(message));
    }
  };
};

export const getEventById = (id: string) => {
  return async (dispatch: Dispatch, getState: () => STATE_TYPE) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/events/${id}`);
      dispatch(getEventByIdSuccess(response.data));
    } catch (err) {
      console.log(err);

      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      dispatch(getEventDataRequestError(message));
    }
  };
};
