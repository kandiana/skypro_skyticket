import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_EVENTS_FROM_BD = 'GET_EVENTS_FROM_BD' as const;
export const GET_EVENTS_FROM_BD_ERROR = 'GET_EVENTS_FROM_BD_ERROR' as const;

export const getEvents = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/events?type=today');
      dispatch({ type: GET_EVENTS_FROM_BD, data: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_EVENTS_FROM_BD_ERROR, error: err });
    }
  };
};
