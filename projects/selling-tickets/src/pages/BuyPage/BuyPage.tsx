// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';
import { RootState } from '../../store/store';
import { fetchEventPage } from '../../store/thunks';
import { EventCity } from '../../components/EventCity/EventCity';
import { EventAddress } from '../../components/EventAddress/EventAddress';
import { EventLoader } from '../../components/EventLoader/EventLoader';
import { EventDescription } from '../../components/EventDescription/EventDescription';

import './BuyPage.scss';

type urlParams = {
  id: string;
};

export const BuyPage: FC = () => {
  let { id } = useParams<urlParams>();

  let QRCode = require('qrcode.react');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventPage(id));
  }, [dispatch, id]);

  const cardData = useSelector((state: RootState) => state.reducer.cardData);

  const ticketData = useSelector((state: RootState) => state.tickets);

  console.log(ticketData);

  return (
    <div className="BuyPage">
      {cardData === undefined ? (
        <EventLoader />
      ) : (
        <div>
          <h1>Ваши билеты:</h1>
          {ticketData.ticket === [] ? (
            <EventLoader />
          ) : (
            ticketData.ticket.map((oneTicket) => (
              <div key={oneTicket} style={{ padding: '10px 20px', display: 'inline-block' }}>
                <QRCode value={oneTicket} renderAs="svg" />
              </div>
            ))
          )}
          <h2>Информация о событии:</h2>
          <div style={{ border: '1px solid black', padding: '0 20px 0 20px', maxWidth: '1000px' }}>
            <EventTitle title={cardData.title} />
            <EventDescription description={cardData.description} />
            <EventCity city={cardData.city} />
            <EventAddress address={cardData.address} />
            <EventDate date={cardData.startTimestamp} />
          </div>
        </div>
      )}
    </div>
  );
};
