import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';

import './EventCard.scss';

export type EventCardProps = {
  title: string;
  imagePath: string;
  date: Date;
  id: string;
};

export const EventCard: FC<EventCardProps> = ({ title, imagePath, date, id }) => {
  const history = useHistory();

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
