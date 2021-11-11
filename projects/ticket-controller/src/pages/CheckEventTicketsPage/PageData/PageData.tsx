import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkEventTicket } from '../../../store/actions';
import { EventDataType } from '../../../store/reducer';
import { RootState } from '../../../store/store';

import { EventData } from '../../../components/EventData/EventData';

import { ContinuousQrScanner } from 'react-webcam-qr-scanner.ts';
import QRScanner from 'qr-scanner';

import './PageData.scss';

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
    <div className="PageData">
      <EventData event={event} />
      <p className="PageData__status">Статус: {showStatusMessage()}</p>
      <ContinuousQrScanner className="PageData__scanner" onQrCode={setQrCode} />
    </div>
  );
};
