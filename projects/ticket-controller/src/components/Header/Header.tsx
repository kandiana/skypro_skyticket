import { FC, useState } from 'react';
import { format } from 'date-fns';

import './Header.scss';

export const Header: FC = () => {
  const [time, setTime] = useState(format(Date.now(), 'dd.MM.yyyy HH:mm:ss').split(' '));

  setInterval(() => {
    setTime(format(Date.now(), 'dd.MM.yyyy HH:mm:ss').split(' '));
  }, 1000);

  return (
    <header className="Header">
      <div className="container wrapper">
        SkyTicket{' '}
        <div>
          <p className="Header__time">{time[0]}</p>
          <p className="Header__time">{time[1]}</p>
        </div>
      </div>
    </header>
  );
};
