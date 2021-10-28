import { FC } from 'react';
import './InputText.scss'

export type props = {
    value: string;
}

export const InputText: FC<props> = ({value}) => {
    return (
        <input
            className='InputText'
            value={value}
        />   
    );
};