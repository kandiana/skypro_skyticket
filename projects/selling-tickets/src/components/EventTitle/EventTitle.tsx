import { FC } from 'react';
import './EventTitle.scss';

export type EventTitleProps = {
  title: string;
};

export const EventTitle: FC<EventTitleProps> = ({ title }) => {
  return <h2 className="EventTitle">{title}</h2>;
};
