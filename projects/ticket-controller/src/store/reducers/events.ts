import { AnyAction } from 'redux';
import { GET_EVENTS_FROM_BD, GET_EVENTS_FROM_BD_ERROR } from '../actions/events';

export type EventsDataShort = {
  _id: string;
  img: { url: string };
  title: string;
  city: string;
  category: string;
  startTimestamp: Date;
  tickets: { total: string };
};

export type Events = {
  [key: string]: EventsDataShort;
};

export type INITIAL_STATE_TYPE = {
  status: string;
  events: Events;
  message?: string;
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  status: '',
  events: {},
};

export const eventsReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GET_EVENTS_FROM_BD:
      const events: Events = {};

      action.data.events.forEach((event: EventsDataShort) => {
        events[event._id] = { ...event };
      });

      return { ...state, status: action.data.status, events: events };

    case GET_EVENTS_FROM_BD_ERROR:
      return { ...state, status: 'error', message: action.error };

    default:
      return state;
  }
};
