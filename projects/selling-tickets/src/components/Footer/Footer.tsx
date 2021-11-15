import { FC } from 'react';

import './Footer.scss';

export type FooterProps = {
  title: string;
};

export const Footer: FC<FooterProps> = ({ title }) => {
  return (
    <footer className="Footer">
      <div className="Footer__title">{title}</div>
    </footer>
  );
};
