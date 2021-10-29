import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { CardsContainer } from './components/CardsContainer/CardsContainer';
import { Header } from './components/Header/Header';
import { Menu } from './components/Menu/Menu';


const App: FC = () => {
  const handleClick = () => {
    console.log('click')
  }
 
  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Menu />
      <CardsContainer />
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
