import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { EventPage } from './pages/EventPage/EventPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';

const App: FC = () => {
  return (
    <div className="App">
      <Header title="SkyTicket" />
      <main className="App__main">
        <Switch>
          <Route path="/events/:id">
            <EventPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </main>

      <Footer title={'Copyright © 2021 Donatello Inc.'} />
    </div>
  );
};

export default App;
