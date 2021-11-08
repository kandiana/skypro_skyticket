export const FILTER_EVENTS = 'FILTER_EVENTS' as const;
export const GET_EVENTS_FROM_BD = 'GET_EVENTS_FROM_BD' as const;

export const filterEvents = (filter: string) => {
  return { type: FILTER_EVENTS, filter };
};

export const getEvents = () => {
  return { type: GET_EVENTS_FROM_BD };
};
