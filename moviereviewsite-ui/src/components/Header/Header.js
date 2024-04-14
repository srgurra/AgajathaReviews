import React from 'react';
import './Header.css';
import Logout from '../Logout/Logout';

const Header = () => {
    return (
      <header className="headeradmin">
        <div className="header__logo">
          <img src="/logo1.png" alt="Logo" />
        </div>
        <h1 className="header__title">ADMIN DASHBOARD</h1>
        <Logout />
      </header>
    );
  };
  
  export default Header;