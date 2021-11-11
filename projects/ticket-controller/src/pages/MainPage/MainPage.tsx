import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventCard } from '../../components/EventCard/EventCard';
import { getEvents } from '../../store/actions';
import { EventDataType } from '../../store/reducer';
import { RootState } from '../../store/store';

import './MainPage.scss';

export const MainPage: FC = () => {
  const dispatch = useDispatch();
  const eventsData = useSelector((state: RootState) => state.events);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  };

  const getEventsArray = (): EventDataType[] => {
    return Object.keys(eventsData.data).map((id: string) => eventsData.data[id]);
  };

  const filterEventsData = (array: EventDataType[]) => {
    return array.filter((event) => event.title.includes(filter));
  };

  const renderEventsInfo = () => {
    switch (eventsData.status) {
      case 'ok':
        const eventsArray = filterEventsData(getEventsArray());

        if (eventsArray.length === 0) {
          return <p className="MainPage__text">Подходящих мероприятий нет</p>;
        }

        return eventsArray.map((event) => <EventCard key={event._id} event={event} />);

      case 'error':
        return 'Ошибка подключения к базе данных';

      default:
        return 'Лоадер';
    }
  };

  return (
    <main className="MainPage">
      <div className="container">
        <input
          className="MainPage__input"
          value={filter}
          onChange={handleInputChange}
          placeholder="Название мероприятия"
        />
        <div>{renderEventsInfo()}</div>
      </div>
    </main>
  );
};
