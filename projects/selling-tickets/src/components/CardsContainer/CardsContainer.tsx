import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from '../EventCard/EventCard';
import { EventLoader } from '../EventLoader/EventLoader';
import { RootState } from '../../store/store';
import { fetchEventsShortData } from '../../store/thunks';
import { Button } from '../Button/Button';

import './CardsContainer.scss';

export type EventDataShort = {
  _id: string;
  category: string;
  categoryOther: string;
  img: { url: string };
  title: string;
  description: string;
  city: string;
  address: string;
  startTimestamp: Date;
  endTimestamp: Date;
  tickets: { total: string };
};

export const CardsContainer: FC = () => {
  let filter = useSelector((state: RootState) => state.formData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsShortData());
  }, [dispatch]);

  const cardsData = useSelector((state: RootState) => state.cardsData);

  const [index, setIndex] = useState(0);

  const finalCards: EventDataShort[] = [];

  const CARDS_PER_PAGE = 4;

  const disabledNextButton = () => {
    if (index >= finalCards?.length - CARDS_PER_PAGE) return true;
    return false;
  };
  const disabledPreviousButton = () => {
    if (index === 0) return true;
    return false;
  };

  const getNextCards = () => {
    setIndex((prev) => prev + CARDS_PER_PAGE);
  };

  const getPreviousCards = () => {
    setIndex((prev) => prev - CARDS_PER_PAGE);
  };

  function getNewArr(
    arr: EventDataShort[],
    dateCardFrom: string,
    dateCardTo: string,
    categoryCard: string,
    titleCard: string
  ) {
    if (dateCardFrom === '' && categoryCard === '' && titleCard === '') {
      for (let i = 0; i < arr.length; i++) {
        finalCards.push(arr[i]);
      }
    }
    if (categoryCard !== '') {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].category.toLowerCase() === categoryCard) {
          finalCards.push(arr[i]);
        }
      }
    }
    if (titleCard !== '') {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title.toLowerCase().includes(titleCard)) {
          finalCards.push(arr[i]);
        }
      }
    }
    if (dateCardFrom !== '') {
      for (let i = 0; i < arr.length; i++) {
        if (
          String(arr[i].startTimestamp) <= dateCardTo &&
          String(arr[i].endTimestamp) >= dateCardFrom
        ) {
          finalCards.push(arr[i]);
        }
      }
    }
    const arrCards = finalCards.slice(index, index + CARDS_PER_PAGE);

    return arrCards;
  }
  return (
    <div className="CardsContainer">
      <div className="CardsContainer__Cards">
        {!cardsData ? (
          <p className="CardsContainer__text">Подходящих мероприятий нет</p>
        ) : cardsData === undefined ? (
          <EventLoader />
        ) : (
          getNewArr(cardsData, filter.dateFrom, filter.dateTo, filter.event, filter.search).map(
            (card) => (
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
                endTimestamp={card.endTimestamp}
                categoryOther={''}
                tickets={{ total: '' }}
              />
            )
          )
        )}
      </div>
      <div className="CardsContainer__Buttons">
        <Button size="M" handleClick={getPreviousCards} disabled={disabledPreviousButton()}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <Button size="M" handleClick={getNextCards} disabled={disabledNextButton()}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
};
