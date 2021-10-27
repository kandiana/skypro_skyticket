import { FC } from 'react';
import './BuyButton.scss'

export type props = {
    buttonText: string
}

export const BuyButton: FC<props> = ({buttonText}) => {

   const handleOver = () => {
        console.log('MouseMove')
    }
    const handleOut = () => {
        console.log('MouseOut')
    }
 
    return (
        <button className='BuyButton' onMouseOver={handleOver} onMouseOut={handleOut}>{buttonText}</button>       
    );
};