import { FC, useEffect } from 'react';
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

  function downloadQRCode(Id_qrcode: string) {
    const qrCodeURL: string = (document.getElementById(Id_qrcode) as HTMLCanvasElement)
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  return (
    <div className="BuyPage">
      {cardData === undefined ? (
        <EventLoader />
      ) : (
        <div>
          <h1>{ticketData.buyer} Ваши билеты:</h1>
          <div className="BuyPage__tickets-block">
            {ticketData.ticket === [] ? (
              <EventLoader />
            ) : (
              ticketData.ticket.map((oneTicket) => (
                <div
                  className="BuyPage__ticket"
                  style={{ cursor: 'pointer' }}
                  key={oneTicket}
                  onClick={() => downloadQRCode(oneTicket)}
                >
                  <QRCode value={oneTicket} renderAs="canvas" id={oneTicket} />
                  <p className="BuyPage__ticket-url">Скачать</p>
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
