import { FC } from 'react';
import './EventTitle.scss';

export type EventTitleProps = {
  title: string;
};

export const EventTitle: FC<EventTitleProps> = ({ title }) => {
  let newTitle = title[0].toUpperCase() + title.slice(1);

  return <h2 className="EventTitle">{newTitle}</h2>;
};
