import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getEventById, resetTicketsData } from '../../store/actions';
import { RootState } from '../../store/store';

import { PageData } from './PageData/PageData';

type urlParams = {
  id: string;
};

export const CheckEventTicketsPage: FC = () => {
  const { id } = useParams<urlParams>();
  const history = useHistory();
  const dispatch = useDispatch();
  const eventsData = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  const goBack = () => {
    dispatch(resetTicketsData());
    history.push('/');
  };

  const renderPageData = () => {
    switch (eventsData.status) {
      case 'ok':
        return <PageData event={eventsData.data[id]} />;

      case 'error':
        return 'Ошибка подключения к базе данных';

      default:
        return 'Лоадер';
    }
  };

  return (
    <main>
      {renderPageData()}
      <button onClick={goBack}>Назад</button>
    </main>
  );
};