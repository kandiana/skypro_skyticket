import { ARR_CARDS_ACTION } from './actions';
import axios from 'axios';

export const fetchEventsShortData = () => {
	return async (dispatch, getState) => {
    const storeData = getState().data;
 	  const response = await axios.get('http://localhost:5000/ping');

		dispatch({ ARR_CARDS_ACTION, eventCards: response.data});
	};
};
