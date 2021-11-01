import React, { FC } from 'react';
import './Input.scss';

export type Props = {
  name: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
};

export const Input: FC<Props> = ({ name, placeholder, onChange, value }) => {
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
