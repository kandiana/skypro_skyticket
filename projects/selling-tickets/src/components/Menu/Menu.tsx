import { FC, useState, useCallback } from 'react';
import { Input } from '../Input/Input';
import { Selector } from '../Selector/Selector';
import { FormType } from '../../App'
import './Menu.scss';

type Props = {
    form: any
    onSave: () => void;
    setForm: (prev: any) => void;
}

export const Menu: FC<Props> = ({ form, onSave, setForm}) => {
  const EVENTS = ['Кино', 'Фестиваль', 'Концерт'];
    const saveFormData = useCallback((e) => {
        e.preventDefault();

        onSave()
    }, [onSave])

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
    setForm((prev: FormType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.name);
    console.log(e.target.value);
  }, []);

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
          <Selector name="event" placeholder="privet" onChange={HandleChange} options={EVENTS} />
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
