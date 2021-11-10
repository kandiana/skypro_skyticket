import { FC } from 'react';

export type EventDataProps = {
  title: string;
  tickets: { total: number; sold: number; checked: number };
};

export const EventData: FC<EventDataProps> = ({ title, tickets }) => {
  return (
    <div>
      <p>Мероприятие: {title}</p>
      <div>
        <p>
          Билетов <span>всего: {tickets.total}, </span>
          <span>продано: {tickets.sold}, </span>
          <span>проверено: {tickets.checked}</span>
        </p>
      </div>
    </div>
  );
};
