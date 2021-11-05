import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EventDate } from '../../components/EventDate/EventDate';

import './BuyPage.scss';

let QRCode = require('qrcode');

export type Props = {
  date: Date;
  text: string;
};

type urlParams = {
  id: string;
};

export const BuyPage: FC<Props> = ({ date, text }) => {
  let { id } = useParams<urlParams>();

  let svg;

  QRCode.toString(id, function (err: any, string: any) {
    if (err) throw err;
    svg = string;
  });

  return (
    <div className="Buy-page">
      <div dangerouslySetInnerHTML={{ __html: String(svg) }} />
      <p>{text}</p>
      <EventDate date={date} />
    </div>
  );
};
