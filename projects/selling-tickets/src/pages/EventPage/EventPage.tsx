import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';

import './EventPage.scss';

export type props = {
  eventTitleText: string;
  imagePath: string;
  date: Date;
  text: string;
};

type urlParams = {
  id: string;
};

export const EventPage: FC<props> = ({ eventTitleText, imagePath, date, text }) => {
  let { id } = useParams<urlParams>();
  console.log(id);
  return (
    <div className="Event-page">
      <EventImage imagePath={imagePath} />
      <EventTitle eventTitleText={eventTitleText} />
      <p>{text}</p>
      <EventDate date={date} />
    </div>
  );
};
