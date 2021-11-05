import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
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

  return (
    <div className="MainPage">
      {/* @ts-ignore */}
      <EventFilter form={form} onSave={saveFilter} setForm={setForm} />
      <CardsContainer />
    </div>
  );
};
