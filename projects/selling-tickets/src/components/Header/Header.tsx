import { FC } from 'react';
import './Header.scss'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'

export type props = {
    headerTitle: string
}

export const Header: FC<props> = ({headerTitle}) => {

 
    return (
        <header className='Header' >
            <Logo className='Header__logo' />
            <h1 className='Header__title'>{headerTitle}</h1>
        </header>       
    );
};