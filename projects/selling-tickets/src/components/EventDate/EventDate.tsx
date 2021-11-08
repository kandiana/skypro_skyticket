import { FC } from 'react';
import { format } from 'date-fns';

import './EventDate.scss';

export type EventDateProps = {
  date: Date;
};

export const EventDate: FC<EventDateProps> = ({ date }) => {
  return <p className="EventDate">{format(date, 'dd.MM.yyyy')}</p>;
};

