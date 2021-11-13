export type EventDataShortType = {
  _id: string;
  img: {
    url: string;
  };
  title: string;
  city: string;
  category: string;
  startTimestamp: Date;
  endTimestamp: Date;
  tickets: { total: number; sold: number };
};

export type EventDataType = {
  _id: string;
  img: {
    name: string;
    url: string;
    originalName: string;
    mimetype: string;
  };
  title: string;
  city: string;
  address: string;
  description: string;
  category: string;
  categoryOther?: string;
  startTimestamp: Date;
  endTimestamp: Date;
  created: Date;
  updated: Date;
  tickets: { total: number; sold: number; checked: number };
};

export type EventsSuccessData = {
  status: string;
  events: EventDataType[];
};

export type OneEventSuccessData = {
  status: string;
  event: EventDataType;
};

export type Events = {
  [key: string]: EventDataType;
};

export type TicketData = {
  _id: string;
  eventId: string;
  buyer: string;
  buyDate: Date;
  checked: boolean;
  number: number;
  checkDate: Date;
};

export type CheckTicketSuccessData = {
  status: 'ok';
  ticket: TicketData;
  ticketsChecked: number;
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
