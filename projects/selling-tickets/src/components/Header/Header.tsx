import { FC } from 'react';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { useHistory } from 'react-router-dom';

import './Header.scss';

export type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  const history = useHistory();

  const goToHome = () => {
    history.push(`/`);
  };

  return (
    <header className="Header">
      <Logo className="Header__logo" />
      <h1 className="Header__title" onClick={goToHome}>
        {title}
      </h1>
    </header>
  );
};
