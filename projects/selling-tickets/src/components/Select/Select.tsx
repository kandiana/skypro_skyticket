import React, { FC } from 'react';
import './Select.scss';

export type Props = {
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  options: string[];
};

export const Select: FC<Props> = ({ name, onChange, options }) => {
  return (
    <select className="Select" name={name} onChange={onChange} >
      <option key='choose' value=''>Выберите...</option>
      {options.map((event) => (
        <option key={event} value={event.toLocaleLowerCase()}>
          {event}
        </option>
      ))}
      ;
    </select>
  );
};

