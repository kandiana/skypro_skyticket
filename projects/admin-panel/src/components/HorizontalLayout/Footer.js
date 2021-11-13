import React from 'react';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              © {new Date().getFullYear()}
              <span className="d-none d-sm-inline-block"> - Crafted with pain by Donatello.</span>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
