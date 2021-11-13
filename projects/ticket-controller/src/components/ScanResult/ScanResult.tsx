import classNames from 'classnames';
import { FC } from 'react';

import { CheckTicketErrorData, CheckTicketSuccessData } from '../../store/store.types';

import { Loader } from '../Loader/Loader';

import './ScanResult.scss';

export type ScanResultProps = {
  scanResult: {
    status: string;
    data?: CheckTicketSuccessData | CheckTicketErrorData;
    message?: string;
  };
};

export const ScanResult: FC<ScanResultProps> = ({ scanResult }) => {
  const showStatusMessage = () => {
    if (scanResult.status === 'error') {
      return 'Ошибка отправки запроса';
    }

    if (scanResult.status === 'waiting') {
      return <Loader />;
    }

    switch (scanResult.data?.status) {
      case 'ok':
        return 'Билет проверен';

      case 'error':
        console.log(scanResult.data);
        return scanResult.data.messageRus;

      default:
        return 'Отсканируйте билет';
    }
  };

  const TicketDataClasses = classNames('TicketData__status', {
    error: scanResult.data?.status === 'error',
    success: scanResult.data?.status === 'ok',
  });

  return (
    <div className="TicketData">
      <p className={TicketDataClasses}>{showStatusMessage()}</p>
    </div>
  );
};
