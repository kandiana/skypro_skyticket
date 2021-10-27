import { FC } from 'react';
import './Header.scss'
// import logo from '../../assets/images/logo.svg'

export type props = {
    headerTitle: string
}

export const Header: FC<props> = ({headerTitle}) => {

 
    return (
        <header className='Header' >
            {/* <img className='Header__logo' src={logo} alt="логотип" /> */}
            <h1 className='Header__title'>{headerTitle}</h1>
        </header>       
    );
};