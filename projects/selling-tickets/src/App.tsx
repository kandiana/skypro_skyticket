import React, { FC } from 'react';
import './App.scss';
import { BuyButton } from './components/BuyButton/BuyButton';

const App: FC = () => {
  return (
    <BuyButton buttonText='Купить'/>
  );
};

export default App;
