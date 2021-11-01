import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import { Button } from './components/Button/Button';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { Header } from './components/Header/Header';
import { InputText } from './components/InputText/InputText';
import { Menu } from './components/Menu/Menu';
import { EventPage } from './pages/EventPage/EventPage';
import imagePath from './assets/images/theBeatlesTribute.jpg';
import { text } from './pages/EventPage/EventPage.json'

const cardPageElement = {
  image: imagePath,
  title: `Новое событие`,
  date: new Date(),
  text: text,
}

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header headerTitle="SkyTicket" />
      <Switch>
        <Route path="/event/:id">
          <EventPage imagePath={cardPageElement.image} eventTitleText={cardPageElement.title} date={cardPageElement.date} text={cardPageElement.text}/>
        </Route>
        <Route path="/">
          <Menu />
          <CardsContainer />
          <Button buttonText="Купить" handleClick={handleClick} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
