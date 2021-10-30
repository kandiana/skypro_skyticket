import { FC } from 'react';
import './EventImage.scss';

export type props = {
  imagePath: string;
};

export const EventImage: FC<props> = ({ imagePath }) => {
  return <img className="EventImage" src={imagePath} alt="мероприятие" />;
};
