import { Switch, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { CheckEventTicketsPage } from './pages/CheckEventTicketsPage/CheckEventTicketsPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/event/:id">
          <CheckEventTicketsPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
