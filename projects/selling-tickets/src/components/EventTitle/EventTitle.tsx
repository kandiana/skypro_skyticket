import { FC } from 'react';
import './EventTitle.scss';

export type Props = {
  title: string;
};

export const EventTitle: FC<Props> = ({ title }) => {
  return <h2 className="EventTitle">{title}</h2>;
};
