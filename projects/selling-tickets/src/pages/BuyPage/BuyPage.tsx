import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';
import { RootState } from '../../store/store';
import { fetchEventPage } from '../../store/thunks';
import { EventCity } from '../../components/EventCity/EventCity';
import { EventAddress } from '../../components/EventAddress/EventAddress';
import { EventLoader } from '../../components/EventLoader/EventLoader';
import { EventDescription } from '../../components/EventDescription/EventDescription';

import './BuyPage.scss';

// export type FormBuyType = {
//   nameBayer: string;
//   countTicket: number;
// };

// const EMPTY_FORM: FormBuyType = {
//   nameBayer: '',
//   countTicket: 1,
// };

// const [form, setForm] = useState(EMPTY_FORM);

type urlParams = {
  id: string;
};

export const BuyPage: FC = () => {
  let { id } = useParams<urlParams>();
  console.log(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventPage(id));
  }, [dispatch, id]);

  const cardData = useSelector((state: RootState) => state.cardData);
  console.log(cardData);

  return (
    <div className="BuyPage">
      {cardData === undefined ? (
        <EventLoader />
      ) : (
        <div>
          <EventImage imagePath={cardData.img.url} />
          <EventTitle title={cardData.title} />
          <EventDescription description={cardData.description} />
          <EventCity city={cardData.city} />
          <EventAddress address={cardData.address} />
          <EventDate date={cardData.startTimestamp} />
        </div>
      )}
    </div>
  );
};
