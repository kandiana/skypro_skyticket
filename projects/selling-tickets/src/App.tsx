import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';

const App: FC = () => {
  const clickHandle = () => {
    console.log('click')
  }

  return (
    <div className="App">
      <Button buttonText='Купить' clickHandle={clickHandle}/>
    </div>
  );
};

export default App;
