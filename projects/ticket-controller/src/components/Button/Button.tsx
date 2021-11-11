import { FC, ReactElement } from 'react';

import './Button.scss';

export type ButtonProps = {
  onClick: () => void;
  children: string;
};

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  );
};
