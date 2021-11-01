import { FC } from 'react';
import { EventCard } from '../EventCard/EventCard';
import './CardsContainer.scss';
import imagePath from '../../assets/images/theBeatlesTribute.jpg';

let titleCard = ''

type EventDataShort = { id: number; image: string; title: string; date: Date };
let newArr: EventDataShort[] = [];
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
  }
];
function getNewArr(arr: EventDataShort[], titleCard: string) {
  if (!titleCard) {
    newArr = arr;
    return
  }
  for (let i=0; i<arr.length; i++) {
    if(arr[i].title === titleCard) {
      newArr.push(arr[i])
    }
  }
}
getNewArr(arr, titleCard)
console.log(newArr)

export const CardsContainer: FC = () => {
  return (
    <div className="CardsContainer">
      {newArr.map((card) => (
        <EventCard id={card.id} imagePath={card.image} title={card.title} date={card.date} />
      ))}
    </div>
  );
};
