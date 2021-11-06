import { FC, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';

import './EventPage.scss';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

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

  const handleChange = useCallback((e) => {}, []);

  return (
    <div className="EventPage">
      <EventImage imagePath={imagePath} />
      <EventTitle title={title} />
      <p>{text}</p>
      <EventDate date={date} />
      <Input
        name={'count-ticket'}
        placeholder={''}
        onChange={handleChange}
        value={''}
        type={'number'}
      />
      <Button color="red" handleClick={goToBuyPage}>
        Купить
      </Button>
    </div>
  );
};
