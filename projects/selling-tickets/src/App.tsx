import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { InputText } from './components/InputText/InputText';
import { Card } from './components/Card/Card';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { Header } from './components/Header/Header';

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Card imagePath={imagePath} eventTitleText='Мероприятие' date={date}/>
      <InputText value=''/>
      <CardsContainer />
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
