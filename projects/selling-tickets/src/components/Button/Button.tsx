import { FC } from 'react';
import './Button.scss';

export type Props = {
  buttonText: string;
  handleClick: () => void;
  size?: 'S' | 'M' | 'L';
  color?: 'red' | 'blue';
};

export const Button: FC<Props> = ({ buttonText, handleClick }) => {
  return (
    <button className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};
