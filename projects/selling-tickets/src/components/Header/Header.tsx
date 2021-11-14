import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

import './Header.scss';

export type HeaderProps = {
  title: string;
};

export const Header: FC<HeaderProps> = ({ title }) => {
  const history = useHistory();

  const goToEventPage = () => {
    history.push(`/`);
  };

  return (
    <header className="Header">
      <Logo className="Header__logo" style={{ cursor: 'pointer' }} onClick={goToEventPage} />
      <h1 className="Header__title" style={{ cursor: 'pointer' }} onClick={goToEventPage}>
        {title}
      </h1>
    </header>
  );
};
