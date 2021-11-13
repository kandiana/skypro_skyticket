import {
  GET_TODAYS_EVENTS_FROM_BD,
  GET_EVENT_DATA_BY_ID,
  GET_EVENTS_DATA_FROM_BD_ERROR,
  CHECK_EVENT_TICKET,
  CHECK_EVENT_TICKET_ERROR,
  CHECK_EVENT_TICKET_REQUEST_ERROR,
  RESET_TICKETS_DATA,
  CHECK_EVENT_TICKET_START,
  RootAction,
} from './actions';

import { EventDataType, Events, STATE_TYPE } from './store.types';

const INITIAL_STATE: STATE_TYPE = {
  events: {
    status: '',
    data: {},
  },
  tickets: {
    status: '',
  },
};

export const eventsReducer = (state = INITIAL_STATE, action: RootAction): STATE_TYPE => {
  switch (action.type) {
    case GET_TODAYS_EVENTS_FROM_BD:
      const events: Events = {};

      action.data.events.forEach((event: EventDataType) => {
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
      const id = action.data.event._id;

      return {
        ...state,
        events: {
          status: action.data.status,
          data: {
            ...state.events.data,
            [id]: {
              ...state.events.data[id],
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
      const eventId = action.eventId;

      return {
        ...state,
        tickets: {
          ...state.tickets,
          status: 'ok',
          message: '',
          data: action.data,
        },
        events: {
          ...state.events,
          data: {
            ...state.events.data,
            [eventId]: {
              ...state.events.data[eventId],
              tickets: {
                ...state.events.data[eventId].tickets,
                checked: action.data.ticketsChecked,
                sold: action.data.ticketsSold,
              },
            },
          },
        },
      };

    case CHECK_EVENT_TICKET_START: {
      return {
        ...state,
        tickets: {
          ...state.tickets,
          status: 'waiting',
          message: undefined,
          data: undefined,
        },
      };
    }

    case CHECK_EVENT_TICKET_ERROR:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          status: 'ok',
          message: '',
          data: action.data,
        },
      };

    case CHECK_EVENT_TICKET_REQUEST_ERROR:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          status: 'error',
          message: action.error,
        },
      };

    case RESET_TICKETS_DATA:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          status: '',
          message: undefined,
          data: undefined,
        },
      };

    default:
      return state;
  }
};
