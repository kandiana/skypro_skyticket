import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { EventDataShortType } from '../../store/store.types';

import './EventCard.scss';

export type EventCardProps = {
  event: EventDataShortType;
};

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/event/${event._id}`);
  };

  const startTime = format(event.startTimestamp, 'dd.MM.yyyy, HH:mm');
  const endTime = format(event.endTimestamp, 'dd.MM.yyyy, HH:mm');

  return (
    <div className="EventCard" onClick={handleClick}>
      <h1 className="EventCard__title">{event.title}</h1>
      <p className="EventCard__text">Город: {event.city}</p>
      <p className="EventCard__text">Тип: {event.category}</p>
      <p className="EventCard__text">Начало: {startTime}</p>
      <p className="EventCard__text">Конец: {endTime}</p>
    </div>
  );
};
