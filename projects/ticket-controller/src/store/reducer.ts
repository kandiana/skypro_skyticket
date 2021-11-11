import { AnyAction } from 'redux';

import {
  GET_TODAYS_EVENTS_FROM_BD,
  GET_EVENT_DATA_BY_ID,
  GET_EVENTS_DATA_FROM_BD_ERROR,
  CHECK_EVENT_TICKET,
  CHECK_EVENT_TICKET_ERROR,
  CHECK_EVENT_TICKET_REQUEST_ERROR,
  RESET_TICKETS_DATA,
} from './actions';

export type EventDataType = {
  _id: string;
  img: { url: string };
  title: string;
  city: string;
  category: string;
  startTimestamp: Date;
  endTimestamp: Date;
  tickets: { total: number; sold: number; checked: number };
};

export type Events = {
  [key: string]: EventDataType;
};

export type TicketData = {
  _id: string;
  eventId: string;
  buyer: string;
  date: number;
  checked: boolean;
  number: number;
};

export type CheckTicketSuccessData = {
  status: 'ok';
  ticket: TicketData;
  ticketsChecked: string | number;
  ticketsSold: number;
};

export type CheckTicketErrorData = {
  status: 'error';
  message: string;
  messageRus: string;
};

export type STATE_TYPE = {
  events: {
    status: string;
    data: Events;
    message?: string;
  };
  tickets: {
    status: string;
    data?: CheckTicketSuccessData | CheckTicketErrorData;
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
