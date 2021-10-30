import { FC, useState } from 'react';
import './Menu.scss';

export const Menu: FC = () => {
  const [buttonState, setButtonState] = useState({
    toggle: false,
    wrapper: false,
  });

    const toggleMenu = buttonState.toggle ? 'Menu__burger-button_opened' : 'Menu__burger-button_closed';
    const wrapperMenu = buttonState.wrapper ? 'Menu__burger-wrapper' : 'Menu__wrapper';

    const handleBurgerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('click')
        
        setButtonState(prev => ({
            ...prev,
            toggle: !prev.toggle,
            wrapper: !prev.wrapper
        })
        ) }

    return (
        <form className='Menu' action=''>
            <div className={wrapperMenu}>
                <div className='Menu__field'>
                    <input className='Menu__input' />
                </div>
                <div className='Menu__field'>
                    <input className='Menu__input' />
                </div>
                <div className='Menu__field'>
                    <select className='Menu__input'>
                        <option value=''>Мероприятие</option>
                    </select>
                </div>
                <div className='Menu__field'>
                    <input className='Menu__input' />
                </div>
                <button className='Menu__button'>Отправить</button>
            </div>
            <button type='button' className={'Menu__burger-button ' + toggleMenu} onClick={handleBurgerClick}></button>
        </form>
    );
};
