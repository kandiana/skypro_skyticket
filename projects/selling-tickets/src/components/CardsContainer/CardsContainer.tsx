import { FC, useEffect } from 'react';
import { EventCard } from '../EventCard/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { EventLoader } from '../EventLoader/EventLoader';

import './CardsContainer.scss';
import { RootState } from '../../store/store';
import { fetchEventsShortData } from '../../store/thunks';

export type EventDataShort = {
  _id: string;
  category: string;
  categoryOther: string;
  img: {url: string};
  title: string;
  description: string;
  city: string;
  address: string;
  startTimestamp: Date;
  tickets: {total: string};
};

export const CardsContainer: FC = () => {
  let filter = useSelector((state: RootState) => state.formData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsShortData());
  }, [dispatch]);

  const cardsData = useSelector((state: RootState) => state.cardsData);

  function getNewArr(arr: EventDataShort[], categoryCard: string, titleCard: string) {
    let result = [];

    if (categoryCard === '' && titleCard === '') {
      return arr;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].category.toLowerCase() === categoryCard) {
        result.push(arr[i]);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.toLowerCase().includes(titleCard)) {
        result.push(arr[i]);
      }
    }
    return result;
  }
  return (
    <div className="CardsContainer">
      {cardsData === undefined ? (
        <EventLoader />
      ) : (
        getNewArr(cardsData, filter.event, filter.search).map((card) => (
          <EventCard
            key={card._id}
            _id={card._id}
            category={card.category}
            img={card.img}
            title={card.title}
            description={card.description}
            city={card.city}
            address={card.address}
            startTimestamp={card.startTimestamp} 
            categoryOther={''} 
            tickets={{ total: '' }}
          />
        ))
      )}
    </div>
  );
};
