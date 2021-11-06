import React, { ChangeEventHandler, FC } from 'react';
import './Input.scss';

export type InputProps = {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  value: string;
  type: string;
};

export const Input: FC<InputProps> = ({ name, placeholder, onChange, value, type }) => {
  return (
    <input
      className="Input"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
    />
  );
};
