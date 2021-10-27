import { FC } from 'react';
import './Button.scss'

export type props = {
    buttonText: string
    handleClick: () => void
}

export const Button: FC<props> = ({buttonText, handleClick}) => {
    return (
        <button className='Button' onClick={handleClick}>{buttonText}</button>       
    );
};