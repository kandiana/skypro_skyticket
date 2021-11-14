import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
          <h1>{ticketData.buyer} ваши билеты:</h1>
          <div className="BuyPage__tickets-block">
            {ticketData.ticket === [] ? (
              <EventLoader />
            ) : (
              ticketData.ticket.map((oneTicket) => (
                <div className="BuyPage__ticket" key={oneTicket}>
                  <QRCode value={oneTicket} renderAs="svg" />
                  <Link to={oneTicket} target="_blank" download>
                    Скачать
                  </Link>
                </div>
              ))
            )}
          </div>
          <h2>Информация о событии:</h2>
          <div className="BuyPage__text-block">
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
