import { FC } from 'react';
import { EventDataType } from '../../store/store.types';
import { format } from 'date-fns';

import './EvendData.scss';

export type EventDataProps = {
  event: EventDataType;
};

export const EventData: FC<EventDataProps> = ({ event }) => {
  const tickets = event.tickets;

  const startTime = format(event.startTimestamp, 'dd.MM.yyyy, HH:mm');
  const endTime = format(event.endTimestamp, 'dd.MM.yyyy, HH:mm');

  const formatDateTime = () => {
    if (startTime.split(', ')[0] !== endTime.split(', ')[0]) {
      return (
        <p className="EventData__text">
          {startTime}
          <span className="EventData__text-separator"> - </span>
          {endTime}
        </p>
      );
    }

    return (
      <p className="EventData__text">
        {startTime} - {endTime.split(', ')[1]}
      </p>
    );
  };

  return (
    <div className="EventData">
      <h2 className="visually-hidden">Данные мероприятия</h2>
      <div className="EventData__event">
        <h3 className="EventData__title">{event.title}</h3>
        {formatDateTime()}
      </div>
      <div className="EventData__tickets">
        <h3 className="visually-hidden">Билеты</h3>
        <div className="wrapper">
          <div>
            <p className="EventData__text">Всего билетов</p>
            <p className="EventData__text">{tickets.total}</p>
          </div>
          <div>
            <p className="EventData__text">Продано</p>
            <p className="EventData__text">{tickets.sold}</p>
          </div>
          <div>
            <p className="EventData__text">Проверено</p>
            <p className="EventData__text">{tickets.checked}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
