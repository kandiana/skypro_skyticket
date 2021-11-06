import { ARR_CARDS_ACTION } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from './store';

export const fetchEventsShortData = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const storeData = getState();
    console.log(storeData);
    const response = await axios.get('http://localhost:5000/ping');

    dispatch({ type: ARR_CARDS_ACTION, eventCards: response.data });
  };
};
