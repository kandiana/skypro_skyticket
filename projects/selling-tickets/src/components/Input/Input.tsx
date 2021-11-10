import React, { ChangeEventHandler, FC } from 'react';
import './Input.scss';

export type InputProps = {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  value: string;
};

export const Input: FC<InputProps> = ({ name, placeholder, onChange, value }) => {
  return (
    <input
      className="Input"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
