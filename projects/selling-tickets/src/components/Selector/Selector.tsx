import React, { FC } from 'react';
import './Selector.scss';

export type Props = {
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  options: string[];

};

export const Selector: FC<Props> = ({ name, placeholder, onChange, options }) => {
  // console.log(options)
  return (
    <select className="Selector" name={name} onChange={onChange} >
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

