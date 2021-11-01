import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';

import './EventCard.scss';

export type Props = {
  title: string;
  imagePath: string;
  date: Date;
  id: number;
};

export const EventCard: FC<Props> = ({ title, imagePath, date, id }) => {
  const history = useHistory();
  console.log(id);
  const goToEventPage = () => {
    history.push(`/event/${id}`);
  };
  return (
    <div className="EventCard" onClick={goToEventPage}>
      <EventImage imagePath={imagePath} />
      <EventTitle title={title} />
      <EventDate date={date} />
    </div>
  );
};
