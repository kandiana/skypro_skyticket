import { FC } from 'react';
import classNames from 'classnames';
import './Button.scss';

export type props = {
  handleClick: () => void;
  disabled: boolean;
  size?: 'S' | 'M' | 'L';
  color?: 'red' | 'blue';
};

export const Button: FC<props> = ({
  children,
  handleClick,
  disabled,
  size = undefined,
  color = undefined,
}) => {
  const buttonClasses = classNames(
    'Button',
    {
      Button_small: size === 'S',
      Button_medium: size === 'M',
      Button_large: size === 'L',
    },
    { Button_red: color === 'red', Button_blue: color === 'blue' }
  );

  return (
    <button className={buttonClasses} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
