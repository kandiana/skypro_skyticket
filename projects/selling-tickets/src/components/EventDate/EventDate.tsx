import { FC } from 'react';
import './EventDate.scss';
import { format } from 'date-fns';

export type EventDateProps = {
  date: Date;
};

export const EventDate: FC<EventDateProps> = ({ date }) => {
  return <p className="EventDate">{format(date, 'dd.MM.yyyy')}</p>;
};
