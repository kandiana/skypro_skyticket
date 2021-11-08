import { Switch, Route } from 'react-router-dom';

import { CheckEventTicketsPage } from './pages/CheckEventTicketsPage/CheckEventTicketsPage';
import { MainPage } from './pages/MainPage/MainPage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/tickets/:eventId">
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
