import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';

const App: FC = () => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <div className="App">
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
