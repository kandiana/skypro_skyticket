import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import pathImage from './assets/images/theBeatlesTribute.jpg'


const App: FC = () => {
  const date = new Date()

  const handleClick = () => {
    console.log('click')
  }
 
  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Card pathImage={pathImage} eventTitleText='Мероприятие' date={date}/>
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
