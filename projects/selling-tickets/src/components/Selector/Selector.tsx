import React, { FC } from 'react';
import './Selector.scss';

export type Props = {
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string[];
};

export const Selector: FC<Props> = ({ name, placeholder, onChange, value }) => {
  return (
    <select className="Selector" name={name} onChange={onChange} value={value}>
      <option value="">Выберите...</option>
      {value.map((event) => (
        <option key={event} value={event.toLocaleLowerCase()}>
          {event}
        </option>
      ))}
      ;
    </select>
  );
};

