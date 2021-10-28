import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { InputText } from './components/InputText/InputText';

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <InputText value=''/>
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
