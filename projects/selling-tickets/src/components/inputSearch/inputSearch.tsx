import { FC } from 'react';
import './inputSearch.scss'

export type props = {
    value: string;
    onChange: (e: any) => void;
    disabled: boolean;
    editable: boolean;
    id: string;
    name: string;
    placeholder: string;
}

export const inputSearch: FC<props> = ({value}) => {
    return (
        <input
            className='inputSearch'
            id="inputSearch"
            value={value}
        />   
    );
};