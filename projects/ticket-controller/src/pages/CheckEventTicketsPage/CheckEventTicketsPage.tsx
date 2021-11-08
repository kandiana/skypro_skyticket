import { FC } from 'react';
import { useParams } from 'react-router-dom';

type urlParams = {
  id: string;
};

export const CheckEventTicketsPage: FC = () => {
  const { id } = useParams<urlParams>();
  return <main>{`Тут будут проверяться билеты на мероприятие ${id}`} </main>;
};
