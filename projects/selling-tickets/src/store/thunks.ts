import { ARR_CARDS_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from './store';

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const storeData = getState();
    console.log(storeData);
    const response = await axios.get('http://localhost:5000/events');
    console.log('response', response);

    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.events });
  };
};

export const fetchEventPage = (id: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const storeData = getState();
    console.log(storeData);
    const response = await axios.get(`http://localhost:5000/event/${id}`);
    console.log('response', response);
    
    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data.event });
  };
};
