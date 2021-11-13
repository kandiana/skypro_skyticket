import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
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

export type BuyTicketType = [
  {
    _id: string;
    eventId: string;
    buyer: string;
    ticket: [];
  }
];

const EMPTY_FORM: FormType = {
  dateFrom: '',
  dateTo: '',
  search: '',
  event: '',
};

export const MainPage: FC = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  console.log('!!!', form);

  const dispatch = useDispatch();

  const saveFilter = () => {
    dispatch(getFormFilter(form));
  };

  return (
    <div className="MainPage">
      <EventFilter onSave={saveFilter} setForm={setForm} form={form} />
      <CardsContainer />
    </div>
  );
};
