import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { EventPage } from './pages/EventPage/EventPage';
import { MainPage } from './pages/MainPage/MainPage';
import { text } from './pages/EventPage/EventPage.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import imagePath from './assets/images/theBeatlesTribute.jpg';
import { Button } from './components/Button/Button';
import { BuyPage } from './pages/BuyPage/BuyPage';

const cardPageElement = {
  image: imagePath,
  title: `Новое событие`,
  date: new Date(),
  text: text,
};

const App: FC = () => {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="App">
      <Header title="SkyTicket" />
      <Switch>
        <Route path="/event/:id">
          <EventPage
            imagePath={cardPageElement.image}
            title={cardPageElement.title}
            date={cardPageElement.date}
            text={cardPageElement.text}
          />
        </Route>
        <Route path="/buy/:id">
          <BuyPage date={cardPageElement.date} text={cardPageElement.text} imagePath={''} />
        </Route>
        <Route path="/">
          <Button color="red" handleClick={handleClick} buttonText={''}>
            Купить
          </Button>
          <Button size="S" handleClick={handleClick} buttonText={''}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button size="M" handleClick={handleClick} buttonText={''}>
            Средняя
          </Button>
          <Button size="L" color="blue" handleClick={handleClick} buttonText={''}>
            Большая
          </Button>
          <Button size="M" color="red" handleClick={handleClick} buttonText={''}>
            <FontAwesomeIcon icon={faPlus} />
            {' Добавить'}
          </Button>
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
