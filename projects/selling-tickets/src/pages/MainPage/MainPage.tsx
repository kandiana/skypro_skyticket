import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { EventFilter } from '../../components/EventFilter/EventFilter';

import './MainPage.scss';

export type FormType = {
  dateFrom: string;
  dateTo: string;
  search: string;
  event: string;
};

const EMPTY_FORM: FormType = {
  dateFrom: '',
  dateTo: '',
  search: '',
  event: '',
};

export const MainPage: FC = () => {
  const [form, setForm] = useState(EMPTY_FORM);

  const dispatch = useDispatch();

  const saveFilter = () => {
    dispatch({ type: 'form/filter', form: form });
  };

  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="MainPage">
      {/* @ts-ignore */}
      <EventFilter form={form} onSave={saveFilter} setForm={setForm} />
      <CardsContainer />
      <Button onClick={handleClick}>Купить</Button>
    </div>
  );
};
