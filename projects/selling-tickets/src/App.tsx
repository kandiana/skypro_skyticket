import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { EventPage } from './pages/EventPage/EventPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';

const App: FC = () => {
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
