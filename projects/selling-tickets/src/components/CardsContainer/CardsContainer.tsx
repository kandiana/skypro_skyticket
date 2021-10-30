import { FC } from 'react';
// import { useHistory } from 'react-router-dom';
import { EventCard } from '../EventCard/EventCard';
import './CardsContainer.scss';
import imagePath from '../../assets/images/theBeatlesTribute.jpg';

type EventDataShort = { id: number; image: string; title: string; date: Date };
const arr: EventDataShort[] = [];

for (let i = 1; i <= 10; i++) {
  arr.push({
    id: i,
    image: imagePath,
    title: `Card ${i}`,
    date: new Date(),
  });
}

export const CardsContainer: FC = () => {
  return (
    <div className="CardsContainer">
      {arr.map((card) => (
        <EventCard id={card.id} imagePath={card.image} eventTitleText={card.title} date={card.date} />
      ))}
    </div>
  );
};
