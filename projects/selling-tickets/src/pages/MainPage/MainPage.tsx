import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button/Button';
import { CardsContainer } from '../../components/CardsContainer/CardsContainer';
import { EventFilter } from '../../components/EventFilter/EventFilter';
import { getFormFilter } from '../../store/actions';

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
    dispatch(getFormFilter(), { form: form });
  };

  const handleClick = () => {
    console.log('click');
  };

  return (
    <div className="MainPage">
      <EventFilter form={form} onSave={saveFilter} setForm={setForm} />
      <CardsContainer />
      <Button handleClick={handleClick}>Купить</Button>
    </div>
  );
};
