import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getEventById } from '../../store/thunk/events';
import { resetTicketsData } from '../../store/actions';
import { RootState } from '../../store/store';

import { PageData } from './PageData/PageData';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader/Loader';

import './CheckEventTicketsPage.scss';

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
    // we need this property to render data
    if (eventsData.data[id] && !('checked' in eventsData.data[id]?.tickets)) {
      return (
        <div className="CheckEventTicketsPage_stretched">
          <Loader />
        </div>
      );
    }

    switch (eventsData.status) {
      case 'ok':
        return <PageData event={eventsData.data[id]} />;

      case 'error':
        return 'Ошибка подключения к базе данных';

      default:
        return (
          <div className="CheckEventTicketsPage_stretched">
            <Loader />
          </div>
        );
    }
  };

  return (
    <main className="CheckEventTicketsPage">
      <div className="container CheckEventTicketsPage__container">
        <h1 className="visually-hidden">Проверка билетов</h1>
        {renderPageData()}
        <Button onClick={goBack}>Назад</Button>
      </div>
    </main>
  );
};
