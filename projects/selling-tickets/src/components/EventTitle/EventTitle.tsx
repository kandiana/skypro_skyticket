import { FC } from 'react';
import './EventTitle.scss';

export type props = {
  eventTitleText: string;
};

export const EventTitle: FC<props> = ({ eventTitleText }) => {
  return <h2 className="EventTitle">{eventTitleText}</h2>;
};
