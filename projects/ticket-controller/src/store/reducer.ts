import { AnyAction } from 'redux';

import {
  GET_TODAYS_EVENTS_FROM_BD,
  GET_EVENT_DATA_BY_ID,
  GET_EVENTS_DATA_FROM_BD_ERROR,
  CHECK_EVENT_TICKET,
} from './actions';

export type EventsDataShort = {
  _id: string;
  img: { url: string };
  title: string;
  city: string;
  category: string;
  startTimestamp: Date;
  tickets: { total: number; sold: number; checked: number };
};

export type Events = {
  [key: string]: EventsDataShort;
};

export type STATE_TYPE = {
  events: {
    status: string;
    data: Events;
    message?: string;
  };
  tickets: {
    status: string;
    message?: string;
  };
};

const INITIAL_STATE: STATE_TYPE = {
  events: {
    status: '',
    data: {},
  },
  tickets: {
    status: '',
  },
};

export const eventsReducer = (state = INITIAL_STATE, action: AnyAction): STATE_TYPE => {
  switch (action.type) {
    case GET_TODAYS_EVENTS_FROM_BD:
      const events: Events = {};

      action.data.events.forEach((event: EventsDataShort) => {
        events[event._id] = { ...event };
      });

      return {
        ...state,
        events: {
          status: action.data.status,
          data: events,
          message: '',
        },
      };

    case GET_EVENT_DATA_BY_ID:
      const eventId = action.data.event._id;

      return {
        ...state,
        events: {
          status: action.data.status,
          data: {
            ...state.events.data,
            [eventId]: {
              ...state.events.data[eventId],
              ...action.data.event,
            },
          },
          message: '',
        },
      };

    case GET_EVENTS_DATA_FROM_BD_ERROR:
      return {
        ...state,
        events: {
          ...state.events,
          status: 'error',
          message: action.error,
        },
      };

    case CHECK_EVENT_TICKET:
      return state;

    default:
      return state;
  }
};
