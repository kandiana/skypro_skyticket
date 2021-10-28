import React, { FC } from 'react';
import './App.scss';
import { Button } from './components/Button/Button';
import { inputSearch } from './components/inputSearch/inputSearch';

const App: FC = () => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <div className="App">
      <inputSearch />
      <Button buttonText='Купить' handleClick={handleClick}/>
    </div>
  );
};

export default App;
