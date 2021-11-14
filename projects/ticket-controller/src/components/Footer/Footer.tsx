import { FC } from 'react';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="Footer">
      <div className="container">
        <p className="Footer__copy">Copyright &copy; 2021 Donatello Inc.</p>
      </div>
    </footer>
  );
};
