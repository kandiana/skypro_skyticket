import { FC } from 'react';
import './EventDate.scss';
import { format } from 'date-fns';

export type Props = {
  date: Date;
};

export const EventDate: FC<Props> = ({ date }) => {
  return <p className="EventDate">{format(date, 'dd.MM.yyyy')}</p>;
};
