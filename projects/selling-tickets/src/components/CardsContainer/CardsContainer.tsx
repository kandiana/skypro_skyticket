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
  tickets: { total: string };
};

const ELEMENTS = {
  index: 0,
  disabledNext: false, //работает
  disabledPrevious: true, //работает
};

export const CardsContainer: FC = () => {
  
  let filter = useSelector((state: RootState) => state.formData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsShortData());
  }, [dispatch]);

  const cardsData = useSelector((state: RootState) => state.cardsData);
  
  const [Elements, setIndex] = useState(ELEMENTS);
  const [Disabled, setDisabled] = useState(ELEMENTS);
  
  const CARDS_PER_PAGE = 2;

  const getNextIndex = () => {
    return Elements.index + CARDS_PER_PAGE;
  };
  const getPreviousIndex = () => {
    return Elements.index - CARDS_PER_PAGE;
  };

  const disabledNextButton = () => {
    if ( cardsData?.length === undefined || Elements.index + CARDS_PER_PAGE >= cardsData?.length - CARDS_PER_PAGE ) return true;
    return false;
  };
  const disabledPreviousButton = () => {
    console.log(Elements.index);
    if (Elements.index >= 0) return false;
    return true;
  };

    const getNextCards = () => {
      setIndex((prev) => ({
        ...prev,
        index: getNextIndex(),
      }));
    };

    const getDisabled = () => {
      setDisabled((prev) => ({
        ...prev,
        disabledNext: disabledNextButton(),
        disabledPrevious: disabledPreviousButton(),
      }));
    };

    const getPreviousCards = () => {
      setIndex((prev) => ({
        ...prev,
        index: getPreviousIndex(),
      }));
    };


  function getNewArr(arr: EventDataShort[], categoryCard: string, titleCard: string) {
    const result = [];

    if (categoryCard === '' && titleCard === '') {
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
      }
    }
    if (categoryCard !== '') {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].category.toLowerCase() === categoryCard) {
          result.push(arr[i]);
        }
      }
    }
    if (titleCard !== '') {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title.toLowerCase().includes(titleCard)) {
          result.push(arr[i]);
        }
      }
    }
    const arrCards = result.slice(Elements.index, Elements.index + 2);

    return arrCards;
  }
  return (
    <div className="CardsContainer">
      <Button size="S" handleClick={() => { getPreviousCards(); getDisabled();}} disabled={Disabled.disabledPrevious}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
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
      <Button size="S" handleClick={() => { getNextCards(); getDisabled();}} disabled={Disabled.disabledNext}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};
