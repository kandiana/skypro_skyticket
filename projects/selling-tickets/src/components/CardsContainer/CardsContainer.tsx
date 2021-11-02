import { FC } from 'react';
import { EventCard } from '../EventCard/EventCard';
import { FormType } from '../../App';
import './CardsContainer.scss';
import imagePath from '../../assets/images/theBeatlesTribute.jpg';

type EventDataShort = { id: number; image: string; title: string; date: Date };
const arr: EventDataShort[] = [
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

type Props = {
  filter: FormType;
};

export const CardsContainer: FC<Props> = ({ filter }) => {
  // let newArr: EventDataShort[] = [];

  function getNewArr(arr: EventDataShort[], titleCard: string) {
    console.log(arr);
    let result = [];
    console.log(titleCard);
    if (titleCard === '') {
      console.log(arr);
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
        <EventCard id={card.id} imagePath={card.image} title={card.title} date={card.date} />
      ))}
    </div>
  );
};
