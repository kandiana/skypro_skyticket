import { FC } from 'react';
import { useParams } from 'react-router-dom';

type urlParams = {
  eventId: string;
};

export const CheckEventTicketsPage: FC = () => {
  const { eventId } = useParams<urlParams>();
  return <div>{`Тут будут проверяться билеты на мероприятие ${eventId}`} </div>;
};
