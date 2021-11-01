import { FC } from 'react';
import './EventImage.scss';

export type Props = {
  imagePath: string;
};

export const EventImage: FC<Props> = ({ imagePath }) => {
  return <img className="EventImage" src={imagePath} alt="мероприятие" />;
};
