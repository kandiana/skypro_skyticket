import React, { FC } from 'react';
import { EventDate } from '../../components/EventDate/EventDate';

import './BuyPage.scss';

let QRCode = require('qrcode.react');

export type Props = {
  date: Date;
  text: string;
  tickets: string;
};

export const BuyPage: FC<Props> = ({ date, text, tickets }) => {
  return (
    <div className="Buy-page">
      <QRCode value={tickets} renderAs="svg" />
      <p>{text}</p>
      <EventDate date={date} />
    </div>
  );
};
