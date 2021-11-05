import { FC } from 'react';
import { EventCard } from '../EventCard/EventCard';
import { useSelector } from 'react-redux';
import imagePath from '../../assets/images/theBeatlesTribute.jpg';
import { v4 as uuidv4 } from 'uuid';

import './CardsContainer.scss';

type EventDataShort = { id: string; image: string; title: string; date: Date };

const arr: EventDataShort[] = [
  {
    id: uuidv4(),
    image: imagePath,
    title: `Кино`,
    date: new Date(),
  },

  {
    id: uuidv4(),
    image: imagePath,
    title: `Фестиваль`,
    date: new Date(),
  },

  {
    id: uuidv4(),
    image: imagePath,
    title: `Концерт`,
    date: new Date(),
  },
];

export const CardsContainer: FC = () => {
  // @ts-ignore
  let filter = useSelector((state) => state.formData);

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
      {getNewArr(arr, filter.event).map((card) => (
        <EventCard
          key={card.id}
          id={card.id}
          imagePath={card.image}
          title={card.title}
          date={card.date}
        />
      ))}
    </div>
  );
};
