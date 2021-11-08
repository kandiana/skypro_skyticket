import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';
import { EventDataShort } from '../CardsContainer/CardsContainer';
import { EventCity } from '../EventCity/EventCity';
import { EventAddress } from '../EventAddress/EventAddress';

import './EventCard.scss';

export const EventCard: FC<EventDataShort> = ({
  title,
  img,
  created,
  _id,
  category,
  tickets,
  city,
  address,
}) => {
  const history = useHistory();

  const goToEventPage = () => {
    history.push(`/test/${_id}`);
  };

  return (
    <div className="EventCard" onClick={goToEventPage}>
      <EventImage imagePath={img} />
      <EventTitle title={title} />
      <EventCity city={city} />
      <EventAddress address={address} />
      <EventDate date={created} />
    </div>
  );
};
