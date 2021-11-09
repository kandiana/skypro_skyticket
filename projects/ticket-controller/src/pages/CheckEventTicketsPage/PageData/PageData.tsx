import { FC, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEventTicket } from '../../../store/actions';
import { EventsDataShort } from '../../../store/reducer';

import { EventData } from '../../../components/EventData/EventData';
import { RootState } from '../../../store/store';

export type PageDataProps = {
  event: EventsDataShort;
};

export const PageData: FC<PageDataProps> = ({ event }) => {
  const dispatch = useDispatch();
  const ticketData = useSelector((state: RootState) => state.tickets);
  const [ticketId, setTicketId] = useState('');

  const handleInputChange = useCallback((event) => {
    setTicketId(event.currentTarget.value);
  }, []);

  const checkTicket = () => {
    dispatch(checkEventTicket({ eventId: event._id, ticketId: ticketId }));
  };

  const showStatusMessage = () => {
    if (ticketData.status === 'error') {
      return 'Некорректный запрос';
    }

    switch (ticketData.data?.status) {
      case 'ok':
        return 'Успех';

      case 'error':
        console.log(ticketData.data);
        return ticketData.data.messageRus;

      default:
        return;
    }
  };

  return (
    <div>
      <EventData title={event.title} tickets={event.tickets} />
      <input value={ticketId} onChange={handleInputChange} />
      <button onClick={checkTicket}>Проверить</button>
      <p>{showStatusMessage()}</p>
    </div>
  );
};
