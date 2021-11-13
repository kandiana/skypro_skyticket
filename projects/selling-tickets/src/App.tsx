import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { EventPage } from './pages/EventPage/EventPage';
import { MainPage } from './pages/MainPage/MainPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import { Button } from './components/Button/Button';

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header title="SkyTicket" />
      <Switch>
        <Route path="/events/:id">
          <EventPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
