import { FC, useState, useCallback } from 'react';
import { Input } from '../Input/Input';
import { Selector } from '../Selector/Selector';
import './Menu.scss';

const EVENTS = ['Кино', 'Фестиваль', 'Концерт'];

const EMPTY_FORM = {
  dateFrom: '',
  dateTo: '',
  search: '',
  events: EVENTS,
};

export const Menu: FC = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [buttonState, setButtonState] = useState({
    toggle: false,
    wrapper: false,
  });

  const toggleMenu = buttonState.toggle
    ? 'Menu__burger-button_opened'
    : 'Menu__burger-button_closed';
  const wrapperMenu = buttonState.wrapper ? 'Menu__burger-wrapper' : 'Menu__wrapper';

  const handleBurgerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('click');

    setButtonState((prev) => ({
      ...prev,
      toggle: !prev.toggle,
      wrapper: !prev.wrapper,
    }));
  };

  const HandleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
    console.log(e.target.value);
  }, []);

  const saveFormData = useCallback(
    (e) => {
      e.preventDefault();

      console.log(form);
    },
    [form]
  );

  return (
    <form className="Menu" action="" onSubmit={saveFormData}>
      <div className={wrapperMenu}>
        <div className="Menu__field">
          <Input
            name="dateFrom"
            placeholder="Дата от"
            onChange={HandleChange}
            value={form.dateFrom}
          />
        </div>
        <div className="Menu__field">
          <Input name="dateTo" placeholder="Дата до" onChange={HandleChange} value={form.dateTo} />
        </div>
        <div className="Menu__field">
          <Selector name="events" placeholder="privet" onChange={HandleChange} value={form.events} />
        </div>
        <div className="Menu__field">
          <Input name="search" placeholder="Поиск" onChange={HandleChange} value={form.search} />
        </div>
        <button type="submit" className="Menu__button">
          Отправить
        </button>
      </div>
      <button
        type="button"
        className={'Menu__burger-button ' + toggleMenu}
        onClick={handleBurgerClick}
      ></button>
    </form>
  );
};
