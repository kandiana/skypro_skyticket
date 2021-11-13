import {
  CheckTicketErrorData,
  CheckTicketSuccessData,
  EventsSuccessData,
  OneEventSuccessData,
} from './store.types';

export const GET_TODAYS_EVENTS_FROM_BD = 'GET_TODAYS_EVENTS_FROM_BD' as const;
export const GET_EVENT_DATA_BY_ID = 'GET_EVENT_DATA_BY_ID' as const;
export const GET_EVENTS_DATA_FROM_BD_ERROR = 'GET_EVENTS_DATA_FROM_BD_ERROR' as const;

export const CHECK_EVENT_TICKET = 'CHECK_EVENT_TICKET' as const;
export const CHECK_EVENT_TICKET_START = 'CHECK_EVENT_TICKET_START' as const;
export const CHECK_EVENT_TICKET_ERROR = 'CHECK_EVENT_TICKET_ERROR' as const;
export const CHECK_EVENT_TICKET_REQUEST_ERROR = 'CHECK_EVENT_TICKET_REQUEST_ERROR' as const;

export const RESET_TICKETS_DATA = 'RESET_TICKETS_DATA' as const;

export const getTodaysEventsSuccess = (data: EventsSuccessData) => ({
  type: GET_TODAYS_EVENTS_FROM_BD,
  data,
});

export const getEventByIdSuccess = (data: OneEventSuccessData) => ({
  type: GET_EVENT_DATA_BY_ID,
  data,
});

export const getEventDataRequestError = (error: string) => ({
  type: GET_EVENTS_DATA_FROM_BD_ERROR,
  error,
});

export const checkTicketStart = () => ({ type: CHECK_EVENT_TICKET_START });

export const checkTicketSuccess = (data: CheckTicketSuccessData, eventId: string) => ({
  type: CHECK_EVENT_TICKET,
  data,
  eventId,
});

export const checkTicketError = (data: CheckTicketErrorData) => ({
  type: CHECK_EVENT_TICKET_ERROR,
  data,
});

export const checkTicketRequestError = (error: string) => ({
  type: CHECK_EVENT_TICKET_REQUEST_ERROR,
  error,
});

export const resetTicketsData = () => ({ type: RESET_TICKETS_DATA });

export type GetTodaysEventsSuccessType = ReturnType<typeof getTodaysEventsSuccess>;
export type GetEventByIdSuccessType = ReturnType<typeof getEventByIdSuccess>;
export type GetEventDataRequestErrorType = ReturnType<typeof getEventDataRequestError>;

export type CheckTicketStartType = ReturnType<typeof checkTicketStart>;
export type CheckTicketSuccessType = ReturnType<typeof checkTicketSuccess>;
export type CheckTicketErrorType = ReturnType<typeof checkTicketError>;
export type CheckTicketRequestErrorType = ReturnType<typeof checkTicketRequestError>;

export type ResetTicketsDataType = ReturnType<typeof resetTicketsData>;

export type RootAction =
  | GetTodaysEventsSuccessType
  | GetEventByIdSuccessType
  | GetEventDataRequestErrorType
  | CheckTicketStartType
  | CheckTicketSuccessType
  | CheckTicketErrorType
  | CheckTicketRequestErrorType
  | ResetTicketsDataType;
