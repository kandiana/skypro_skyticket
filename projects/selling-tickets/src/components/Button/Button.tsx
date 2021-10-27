import { FC } from 'react';
import './Button.scss'

export type props = {
    buttonText: string
    clickHandle: () => void
}

export const Button: FC<props> = ({buttonText, clickHandle}) => {
    return (
        <button className='Button' onClick={clickHandle}>{buttonText}</button>       
    );
};