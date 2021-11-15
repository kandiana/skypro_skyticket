import { FC } from 'react';
import './EventImage.scss';
import url from '../../assets/images/advertisement.jpg';

export type EventImageProps = {
  imagePath: string;
};

export const EventImage: FC<EventImageProps> = ({ imagePath }) => {
  let newImagePath = imagePath;

  if (!newImagePath) {
    newImagePath = url;
  }

  return <img className="EventImage" src={newImagePath} alt="мероприятие" />;
};
