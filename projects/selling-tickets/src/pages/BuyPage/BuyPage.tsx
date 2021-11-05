import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EventDate } from '../../components/EventDate/EventDate';

import './BuyPage.scss';

export type Props = {
  imagePath: string;
  date: Date;
  text: string;
};

type urlParams = {
  id: string;
};

export const BuyPage: FC<Props> = ({ date, text }) => {
  let { id } = useParams<urlParams>();
  console.log(id);

  return (
    <div className="Buy-page">
      <p>{text}</p>
      <EventDate date={date} />
    </div>
  );
};
