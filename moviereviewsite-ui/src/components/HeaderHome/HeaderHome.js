import React from 'react';
import './HeaderHome.css';
import { FaSearch } from 'react-icons/fa';
import MenuBar from '../MenuBar/MenuBar';
import SearchBar from '../SearchBar/SearchBar';

const HeaderHome = ({ title }) => {
  return (
    <header className="headerhome">
      <div className="header__logo">
        <a href='/home'>
          <img src="/logo1.png" alt="Logo" />
        </a>
      </div>
      <div className="header__menu">
        <MenuBar />
      </div>
      
      <h1 className="header__title">{title}</h1>
      
      <div className="header__search">
      
        <SearchBar placeholder="Search Movies" />
        <div className="header__search-icon">
          <FaSearch />
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;
