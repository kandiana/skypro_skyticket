import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkEventTicket } from '../../../store/actions';
import { EventDataType } from '../../../store/reducer';

import { EventData } from '../../../components/EventData/EventData';
import { RootState } from '../../../store/store';

import { ContinuousQrScanner } from 'react-webcam-qr-scanner.ts';
import QRScanner from 'qr-scanner';

export type PageDataProps = {
  event: EventDataType;
};

export const PageData: FC<PageDataProps> = ({ event }) => {
  const dispatch = useDispatch();
  const ticketData = useSelector((state: RootState) => state.tickets);
  const [qrCode, setQrCode] = useState('');
  QRScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

  useEffect(() => {
    if (qrCode === '') {
      return;
    }

    dispatch(checkEventTicket({ eventId: event._id, ticketId: qrCode }));
  }, [dispatch, event._id, qrCode]);

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
      <p>
        Ticket Id: <code>{qrCode}</code>
      </p>
      <ContinuousQrScanner onQrCode={setQrCode} style={{ height: '200px' }} />
      <p>{showStatusMessage()}</p>
    </div>
  );
};
