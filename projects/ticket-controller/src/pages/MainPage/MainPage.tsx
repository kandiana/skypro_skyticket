import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventCard } from '../../components/EventCard/EventCard';
import { getEvents } from '../../store/actions';
import { EventsDataShort } from '../../store/reducer';
import { RootState } from '../../store/store';

export const MainPage: FC = () => {
  const dispatch = useDispatch();
  const eventsData = useSelector((state: RootState) => state.events);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const getEventsArray = (): EventsDataShort[] => {
    return Object.keys(eventsData.data).map((id: string) => eventsData.data[id]);
  };

  const filterEventsData = (array: EventsDataShort[]) => {
    return array.filter((event) => event.title.includes(filter));
  };

  const renderEventsInfo = () => {
    switch (eventsData.status) {
      case 'ok':
        const eventsArray = getEventsArray();

        return filterEventsData(eventsArray).map((event) => (
          <EventCard key={event._id} id={event._id} text={event.title} />
        ));

      case 'error':
        return 'Ошибка подключения к базе данных';

      default:
        return 'Лоадер';
    }
  };

  return (
    <main>
      <input value={filter} onChange={handleInputChange} />
      <div>{renderEventsInfo()}</div>
    </main>
  );
};
