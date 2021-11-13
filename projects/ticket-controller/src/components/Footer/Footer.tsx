import { FC } from 'react';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <p className="Footer__copy">&copy; 2021 Донателло</p>
      </div>
    </footer>
  );
};
