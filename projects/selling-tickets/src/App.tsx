import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { InputText } from './components/InputText/InputText';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import imagePath from './assets/images/theBeatlesTribute.jpg'

const App: FC = () => {
  const date = new Date()

  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Card imagePath={imagePath} eventTitleText='Мероприятие' date={date}/>
      <InputText value=''/>
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
