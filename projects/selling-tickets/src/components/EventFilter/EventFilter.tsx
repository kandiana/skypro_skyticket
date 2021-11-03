import { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { FormType } from '../../pages/MainPage/MainPage';

import './EventFilter.scss';

type EventFilterProps = {
  form: FormType;
  onSave: () => void;
  setForm: (prev: any) => void;
};

const EventFilterComponent: FC<EventFilterProps> = ({ form, onSave, setForm }) => {
  const EVENTS = ['Кино', 'Фестиваль', 'Концерт'];

  const saveFormData = (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      onSave();
    }

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

  return (
    <form className="EventFilter" action="" onSubmit={saveFormData}>
      <div className={filterWrapper}>
        <div className="EventFilter__field">
          <Input
            name="dateFrom"
            placeholder="Дата от"
            onChange={handleChange}
            value={form.dateFrom}
          />
        </div>
        <div className="EventFilter__field">
          <Input name="dateTo" placeholder="Дата до" onChange={handleChange} value={form.dateTo} />
        </div>
        <div className="EventFilter__field">
          <Select name="event" placeholder="privet" onChange={handleChange} options={EVENTS} />
        </div>
        <div className="EventFilter__field">
          <Input name="search" placeholder="Поиск" onChange={handleChange} value={form.search} />
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
// @ts-ignore
const mapState = (state) => ({ form: state.formData})

export const EventFilter = connect(mapState)(EventFilterComponent)
