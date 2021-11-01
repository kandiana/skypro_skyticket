import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import { Button } from './components/Button/Button';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';
import { EventPage } from './pages/EventPage/EventPage';
import imagePath from './assets/images/theBeatlesTribute.jpg';
import { text } from './pages/EventPage/EventPage.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cardPageElement = {
  image: imagePath,
  title: `Новое событие`,
  date: new Date(),
  text: text,
};

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header title="SkyTicket" />
      <Switch>
        <Route path="/event/:id">
          <EventPage
            imagePath={cardPageElement.image}
            title={cardPageElement.title}
            date={cardPageElement.date}
            text={cardPageElement.text}
          />
        </Route>
        <Route path="/">
          <Menu />
          <CardsContainer />
          <Button color="red" handleClick={handleClick}>
            Купить
          </Button>
          <Button size="S" handleClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button size="M" handleClick={handleClick}>
            Средняя
          </Button>
          <Button size="L" color="blue" handleClick={handleClick}>
            Большая
          </Button>
          <Button size="M" color="red" handleClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
            {' Добавить'}
          </Button>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
