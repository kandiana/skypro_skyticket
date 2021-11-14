import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { EventPage } from './pages/EventPage/EventPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';
import { BuyPage } from './pages/BuyPage/BuyPage';

const App: FC = () => {
  return (
    <div className="App">
      <Header title="SkyTicket" />
      <div className="App__main">
        <Switch>
          <Route path="/events/:id">
            <EventPage />
          </Route>
          <Route path="/buy/:id">
            <BuyPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
      <Footer title={'Copyright © 2021 Donatello Inc.'} />
    </div>
  );
};

export default App;
