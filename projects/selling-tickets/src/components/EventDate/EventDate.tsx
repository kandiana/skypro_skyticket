import { FC } from 'react';
import { format } from 'date-fns';

import './EventDate.scss';
import ru from 'date-fns/locale/ru';

export type EventDateProps = {
  date: Date;
};

export const EventDate: FC<EventDateProps> = ({ date }) => {
  return <p className="EventDate">{format(date, 'dd MMMM yyyy', {locale: ru})}</p>;
};
