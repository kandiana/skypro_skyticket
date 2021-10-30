import React, { FC, useCallback, useState } from 'react';
import './InputText.scss'

export type props = {
    id: string
    name: string
    placeholder: string
}

export const InputText: FC<props> = ({id, name, placeholder}) => {
    const [value, setValue] = useState('');
    const handlerInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    return (
        <div className="input__conteiner">
            <input
                className='input__conteiner-InputText'
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={handlerInputChange}
                value={value}
                
            /> 
        </div>  
    );
};