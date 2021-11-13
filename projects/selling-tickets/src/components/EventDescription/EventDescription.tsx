import { FC } from "react";
import './EventDescription.scss';

export type EventDescriptionProps = {
  description: string;
};

export const EventDescription: FC<EventDescriptionProps> = ({description}) => {
  return <p className='EventDescription'>{description}</p>;
};