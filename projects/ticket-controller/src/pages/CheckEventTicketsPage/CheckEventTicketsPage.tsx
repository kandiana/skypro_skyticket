import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getEventById } from '../../store/actions';
import { RootState } from '../../store/store';

import { EventData } from '../../components/EventData/EventData';

type urlParams = {
  id: string;
};

export const CheckEventTicketsPage: FC = () => {
  const { id } = useParams<urlParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const eventsData = useSelector((state: RootState) => state.events);
  const event = eventsData.data[id];

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  const renderPageData = () => {
    switch (eventsData.status) {
      case 'ok':
        return [
          <EventData title={event.title} tickets={event.tickets} />,
          <button onClick={() => history.push('/')}>Назад</button>,
        ];

      case 'error':
        return 'Ошибка подключения к базе данных';

      default:
        return 'Лоадер';
    }
  };

  return <main> {renderPageData()} </main>;
};
