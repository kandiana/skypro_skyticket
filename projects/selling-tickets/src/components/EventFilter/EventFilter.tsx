import { FC, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { FormType } from '../../pages/MainPage/MainPage';
import  flatpickr  from 'flatpickr'

import './EventFilter.scss';
import { RootState } from '../../store/store';

type EventFilterProps = {
  onSave: () => void;
  setForm: (prev: any) => void;
  form: FormType;
};

export const EventFilter: FC<EventFilterProps> = ({ onSave, setForm, form }) => {
  const EVENTS = ['Кино', 'Фестиваль', 'Концерт', 'Театр'];

  const filter = useSelector((state: RootState) => state.formData);
  console.log(filter);

  const saveFormData = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    onSave();
  };

  const [buttonState, setButtonState] = useState({
    toggle: false,
    wrapper: false,
  });

  const filterToggle = buttonState.toggle
    ? 'EventFilter__burger-button_opened'
    : 'EventFilter__burger-button_closed';

  const filterWrapper = buttonState.wrapper
    ? 'EventFilter__burger-wrapper'
    : 'EventFilter__wrapper';

  const handleBurgerClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setButtonState((prev) => ({
      ...prev,
      toggle: !prev.toggle,
      wrapper: !prev.wrapper,
    }));
  };

  const handleChange = useCallback(
    (e) => {
      setForm((prev: FormType) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [setForm]
  );

  const handleFocus = () => {
    console.log('focus')
    let date = datePicker
    console.log(date)
  };

  const datePicker = flatpickr('element', {
    allowInput: true,
    enableTime: true,
    mode: "single",
    minDate: "today",
    time_24hr: true,
    dateFormat: "d-m-Y H:i",
    locale: "ru",
  });
  console.log(datePicker)


  return (
    <form className="EventFilter" action="" onSubmit={saveFormData}>
      <div className={filterWrapper}>
        <div className="EventFilter__field">
          <Input
            name="dateFrom"
            placeholder="Дата от"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.dateFrom}
          />
        </div>
        <div className="EventFilter__field">
          <Input
            name="dateTo"
            placeholder="Дата до"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.dateTo}
          />
        </div>
        <div className="EventFilter__field">
          <Select name="event" placeholder="privet" onChange={handleChange} options={EVENTS} />
        </div>
        <div className="EventFilter__field">
          <Input
            name="search"
            placeholder="Поиск"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.search}
          />
        </div>
        <button type="submit" className="EventFilter__button">
          Отправить
        </button>
      </div>
      <button
        type="button"
        className={'EventFilter__burger-button ' + filterToggle}
        onClick={handleBurgerClick}
      ></button>
    </form>
  );
};
