import { FC } from 'react';
import './EventCity.scss';

export type EventCityProps = {
  city: string;
};

export const EventCity: FC<EventCityProps> = ({ city }) => {
  return <h2 className="EventCity">{city}</h2>;
};
