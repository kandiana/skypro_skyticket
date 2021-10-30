import React, { FC, useCallback } from 'react';
import './Selector.scss'

const LIST_SELECT = ['Театр', 'Фестивали', 'Спорт', 'Кино', 'Стендап', 'Экскурсии', 'Шоу'];

export type props = {
    id: string
    name: string
    placeholder: string
}

export const Selector: FC<props> = ({id, name, placeholder}) => {
    const inputChangeHandle = useCallback((e) => {
        const { target } = e;
    
        setForm(prev => ({
          ...prev,
          [target.name]: target.type === 'checkbox' ? target.checked : target.value,
        }));
      }, []);

    return (
        <div className="select__div">
            <select
                className="select__div-select"
                id={id}
                name={name}
                onChange={inputChangeHandle}
                value={placeholder}
            >
            <option value="">Выберите...</option>
                {
                    LIST_SELECT.map(lang => (
                    <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                    ))
                }
            </select>
      </div>
    );
};

function setForm(arg0: (prev: any) => any) {
    throw new Error('Function not implemented.');
}
