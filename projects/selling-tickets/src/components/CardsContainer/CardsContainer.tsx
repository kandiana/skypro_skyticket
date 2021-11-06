import { FC, useEffect } from 'react';
import { EventCard } from '../EventCard/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { EventLoader } from '../EventLoader/EventLoader';
import imagePath from '../../assets/images/theBeatlesTribute.jpg';

import './CardsContainer.scss';
import { RootState } from '../../store/store';
import { fetchEventsShortData } from '../../store/thunks';

export type EventDataShort = { id: number; image: string; title: string; date: Date };

export const arrCards: EventDataShort[] = [
  {
    id: 1,
    image: imagePath,
    title: `Кино`,
    date: new Date(),
  },

  {
    id: 2,
    image: imagePath,
    title: `Фестиваль`,
    date: new Date(),
  },

  {
    id: 3,
    image: imagePath,
    title: `Концерт`,
    date: new Date(),
  },
];

export const CardsContainer: FC = () => {
  let filter = useSelector((state: RootState) => state.formData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsShortData());
  }, [dispatch]);

  const cardsData = useSelector((state: RootState) => state.cardsData);

  function getNewArr(arr: EventDataShort[], titleCard: string) {
    let result = [];

    if (titleCard === '') {
      return arr;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.toLowerCase() === titleCard) {
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
        getNewArr(cardsData, filter.event).map((card) => (
          <EventCard
            key={card.id}
            id={card.id}
            imagePath={card.image}
            title={card.title}
            date={card.date}
          />
        ))
      )}
    </div>
  );
};
