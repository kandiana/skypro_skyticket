import { FC, useState, useCallback } from 'react';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { FormType } from '../../pages/MainPage/MainPage';
import DatePicker, { registerLocale  } from 'react-datepicker';

import './EventFilter.scss';
import 'react-datepicker/dist/react-datepicker.css';
<<<<<<< HEAD
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { ru } from 'date-fns/locale';
=======
>>>>>>> 42f6d72 (fix problem type)

type EventFilterProps = {
  onSave: () => void;
  setForm: (prev: any) => void;
  form: FormType;
};

export const EventFilter: FC<EventFilterProps> = ({ onSave, setForm, form }) => {
  const EVENTS = ['Театр', 'Фестиваль', 'Спорт', 'Кино', 'Стендап', 'Экскурсия', 'Шоу', 'Дети'];
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  registerLocale("ru", ru);

  if (startDate) form.dateFrom = String(+new Date(startDate));
  if (endDate) form.dateTo = String(+new Date(endDate).setHours(24, 0, 0, 0));

  const filter = useSelector((state: RootState) => state.reducer.formData);
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
    // console.log('focus');
  };

  return (
    <form className="EventFilter" action="" onSubmit={saveFormData}>
      <div className={filterWrapper}>
        <div className="EventFilter__field">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            showDisabledMonthNavigation
            isClearable={true}
            locale='ru'
            placeholderText="Дата от"
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <div className="EventFilter__field">
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable={true}
            locale='ru'
            placeholderText="Дата до"
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <div className="EventFilter__field">
          <Select name="event" placeholder="privet" onChange={handleChange} options={EVENTS} />
        </div>
        <div className='EventFilter__search'>
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
      </div>
      <button
        type="button"
        className={'EventFilter__burger-button ' + filterToggle}
        onClick={handleBurgerClick}
      ></button>
    </form>
  );
};
