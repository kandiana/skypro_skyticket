import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkEventTicket, resetTicketsData } from '../../../store/actions';
import { EventDataType } from '../../../store/reducer';
import { RootState } from '../../../store/store';

import { EventData } from '../../../components/EventData/EventData';
import { ScanResult } from '../../../components/ScanResult/ScanResult';
import { ContinuousQrScanner } from 'react-webcam-qr-scanner.ts';
import QRScanner from 'qr-scanner';

import './PageData.scss';

export type PageDataProps = {
  event: EventDataType;
};

export const PageData: FC<PageDataProps> = ({ event }) => {
  const dispatch = useDispatch();
  const scanResult = useSelector((state: RootState) => state.tickets);
  const [qrCode, setQrCode] = useState('');
  QRScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

  useEffect(() => {
    if (qrCode === '') {
      dispatch(resetTicketsData());
      return;
    }

    dispatch(checkEventTicket({ eventId: event._id, ticketId: qrCode }));
  }, [dispatch, event._id, qrCode]);

  return (
    <div className="PageData">
      <EventData event={event} />
      <ScanResult scanResult={scanResult} />
      <ContinuousQrScanner className="PageData__scanner" onQrCode={setQrCode} />
    </div>
  );
};
