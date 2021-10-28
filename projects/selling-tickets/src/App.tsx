import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import pathImage from './assets/images/theBeatlesTribute.jpg'
import { format } from 'date-fns';

const App: FC = () => {
  const handleClick = () => {
    console.log('click')
  }
  const getDate = () => {
    return format(new Date(), 'dd.MM.yyyy')
  }
  

  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Card pathImage={pathImage} eventTitleText='Мероприятие' date={getDate}/>
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
