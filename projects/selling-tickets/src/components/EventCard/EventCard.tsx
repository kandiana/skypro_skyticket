import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';
import { EventDataShort } from '../CardsContainer/CardsContainer';
import { EventCity } from '../EventCity/EventCity';

import './EventCard.scss';

export const EventCard: FC<EventDataShort> = ({
  title,
  img,
  startTimestamp,
  endTimestamp,
  _id,
  category,
  tickets,
  city,
  address,
}) => {
  const history = useHistory();

  const goToEventPage = () => {
    history.push(`/events/${_id}`);
  };

  return (
    <div className="EventCard" onClick={goToEventPage}>
      <div className="EventCard__image">
        <EventImage imagePath={img.url} />
      </div>
      <div className="EventCard__info">
        <EventTitle title={title} />
        <EventCity city={city} />
        <EventDate date={startTimestamp} />
      </div>
    </div>
  );
};
