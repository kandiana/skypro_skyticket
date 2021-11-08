import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';

import './EventPage.scss';
import { EventDataShort } from '../../components/CardsContainer/CardsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchEventPage } from '../../store/thunks';
import { EventCity } from '../../components/EventCity/EventCity';
import { EventAddress } from '../../components/EventAddress/EventAddress';
import { EventLoader } from '../../components/EventLoader/EventLoader';
import { EventDescription } from '../../components/CardsContainer/EventDescription/EventDescription';

type urlParams = {
  id: string;
};

export const EventPage: FC = () => {
  let { id } = useParams<urlParams>();
  console.log(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventPage());
  }, [dispatch]);

  const cardsData = useSelector((state: RootState) => state.cardsData);
  console.log(cardsData);

  function getNewArr(arr: EventDataShort[], id: string) {
    let result = [];

    if (id === '') {
      return arr;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === id) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  return (
    <div className="EventPage">
      {cardsData === undefined ? (
        <EventLoader />
      ) : (
        getNewArr(cardsData, id).map((card) => (
          <div>
            <EventImage imagePath={card.img} />
            <EventTitle title={card.title} />
            <EventDescription description={card.description} />
            <EventCity city={card.city} />
            <EventAddress address={card.address} />
            <EventDate date={card.created} />
          </div>
        ))
      )}
    </div>
  );
};
