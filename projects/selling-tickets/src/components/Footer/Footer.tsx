import { FC } from 'react';

import './Footer.scss';

export type HeaderProps = {
  title: string;
};

export const Footer: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="Footer">
      <div className="Footer__title">{title}</div>
    </header>
  );
};