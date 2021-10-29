import { FC, useState } from 'react';
import './Menu.scss'



export const Menu: FC = () => {
    const [buttonState, setButtonState] = useState({
        toggle: false,
        wrapper: false,
    });

    const toggleMenu = buttonState.toggle ? 'Menu__burgerButton--opened' : 'Menu__burgerButton--closed';
    const wrapperMenu = buttonState.wrapper ? 'Menu__burgerWrapper' : 'Menu__wrapper';

    const handleBurgerClick = (e: React.MouseEvent) => {
        console.log('click')
        
        setButtonState(prev => ({
            ...prev,
            toggle: !prev.toggle,
            wrapper: !prev.wrapper
        })
        ) }

    return (
        <form className='Menu'>
            <div className={wrapperMenu}>
                <div className='Menu__field'>
                    <label htmlFor='calendar' className='Menu__label'></label>
                    <input className='Menu__input' />
                </div>
                <div className='Menu__field'>
                    <label htmlFor='calendar' className='Menu__label'></label>
                    <input className='Menu__input' />
                </div>
                <div className='Menu__field'>
                    <label htmlFor='event' className='Menu__label'></label>
                    <select className='Menu__input'>
                        <option value=''>Мероприятие</option>
                    </select>
                </div>
                <div className='Menu__field'>
                    <label htmlFor='search' className='Menu__label'></label>
                    <input className='Menu__input' />
                </div>
            </div>
            <button type='button' className={'Menu__burgerButton ' + toggleMenu} onClick={handleBurgerClick}></button>
        </form>
    );
};
