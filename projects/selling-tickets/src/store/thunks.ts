import { ARR_CARDS_ACTION, EVENT_PAGE_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from './store';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACK_URL
    : process.env.REACT_APP_BACK_URL_LOCAL;

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // const storeData = getState();
    const response = await axios.get(`${BACKEND_URL}/events`);

    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.events });
  };
};

export const fetchEventPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    // const storeData = getState();
    const response = await axios.get(`${BACKEND_URL}/events/${id}`);

    dispatch({ type: EVENT_PAGE_ACTION, eventCard: response.data.event });
  };
};
