import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { Header } from './components/Header/Header';

const App: FC = () => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <div className="App">
      <Header headerTitle = 'SkyTicket'/>
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
