import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import './Input.scss';

export type InputProps = {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  onFocus: FocusEventHandler;
  value: string;
};

export const Input: FC<InputProps> = ({ name, placeholder, onChange, value, onFocus }) => {
  return (
    <input
      className="Input"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      value={value}
    />
  );
};
