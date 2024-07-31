import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Coffie<span>Shield</span>
        </h3>
      </div>
      <div className="footer-right">
        <p className="footer-company-name">CoffiaShield © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
