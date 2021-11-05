import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';

import './EventPage.scss';
import { Button } from '../../components/Button/Button';

export type EventPageProps = {
  title: string;
  imagePath: string;
  date: Date;
  text: string;
};

type urlParams = {
  id: string;
};

export const EventPage: FC<EventPageProps> = ({ title, imagePath, date, text }) => {
  let { id } = useParams<urlParams>();
  const history = useHistory();
  console.log(id);
  const goToBuyPage = () => {
    history.push(`/buy/${id}`);
  };
  return (
    <div className="EventPage">
      <EventImage imagePath={imagePath} />
      <EventTitle title={title} />
      <p>{text}</p>
      <EventDate date={date} />
      <Button handleClick={goToBuyPage} />
    </div>
  );
};
