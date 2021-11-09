import { FC } from 'react';
import './EventImage.scss';

export type EventImageProps = {
  imagePath: string;
};

export const EventImage: FC<EventImageProps> = ({ imagePath }) => {
  return <img className="EventImage" src={imagePath} alt="мероприятие" />;
};
