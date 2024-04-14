import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = () => {
  /*const navigate = useNavigate();
  const [showOtt, setShowOtt] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [otts, setOTTs] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hoveredOTT, setHoveredOTT] = useState(null);
  const [hoveredLang, setHoveredLang] = useState(null);
  const [hoveredGenre, setHoveredGenre] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster');
      const data = await response.json();
      setOTTs(data);
    };

    const fetchLanguageData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/movies/unique-language-poster');
      const data = await response.json();
      setLanguages(data);
    };

    const fetchGenreData = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/movies/unique-genre-poster');
      const data = await response.json();
      setGenres(data);
    };

    fetchData();
    fetchLanguageData();
    fetchGenreData();
  }, []); 

  const handleMovieClick = (type, value) => {
    navigate(`/${type}/${value}`);
  }; */

  const scrollToBottom = () => {
    console.log("Scolled to botton")
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // Optional: Add smooth scrolling animation
    });
  };

  return (
    <nav className="menu-bar">
      <ul className="menu-bar__list">
        <li className="menu-bar__item">
          <a href="/home">Home</a>
        </li>
        <li className="menu-bar__item">
          {/* OTT */}
         <a href="/ott">OTT</a>
        </li>
        <li  className="menu-bar__item">
          {/* Languages */}
          <a href="/languages">Languages</a>
        </li>
        <li className="menu-bar__item">
          {/* Genre */}
          <a href="/genre">Genre</a>
        </li>
       {/*  <li className="menu-bar__item"
            onMouseEnter={() => setShowOtt(true)}
            onMouseLeave={() => setShowOtt(false)}>
          <div>OTT</div>
          {showOtt && (
            <ul className="dropdown">
              {otts.map((ott, index) => (
                <li key={index}
                    onMouseEnter={() => setHoveredOTT(ott.ott_name)}
                    onMouseLeave={() => setHoveredOTT(null)}>
                  <div onClick={() => handleMovieClick('ott', ott.ott_name)}>{ott.ott_name}</div>
                  {ott.ott_name === hoveredOTT && (
                    <ul className="sub-dropdown">
                      <li onClick={() => handleMovieClick('ott', ott.ott_name, 'movies')}>Movies</li>
                      <li onClick={() => handleMovieClick('ott', ott.ott_name, 'webseries')}>Webseries</li>
                    </ul>
                  )} 
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="menu-bar__item"
            onMouseEnter={() => setShowLang(true)}
            onMouseLeave={() => setShowLang(false)}>
          <div>Language</div>
          {showLang && (
            <ul className="dropdown">
              {languages.map((lang, index) => (
                <li key={index}
                    onMouseEnter={() => setHoveredLang(lang.language_name)}
                    onMouseLeave={() => setHoveredLang(null)}>
                  <div onClick={() => handleMovieClick('language', lang.language_name)}>{lang.language_name}</div>
                  {lang.language_name === hoveredLang && (
                    <ul className="sub-dropdown">
                      <li onClick={() => handleMovieClick('language', lang.language_name, 'movies')}>Movies</li>
                      <li onClick={() => handleMovieClick('language', lang.language_name, 'webseries')}>Webseries</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="menu-bar__item"
            onMouseEnter={() => setShowGenre(true)}
            onMouseLeave={() => setShowGenre(false)}>
          <div>Genre</div>
          {showGenre && (
            <ul className="dropdown">
              {genres.map((genre, index) => (
                <li key={index}
                    onMouseEnter={() => setHoveredGenre(genre.genre)}
                    onMouseLeave={() => setHoveredGenre(null)}>
                  <div onClick={() => handleMovieClick('genre', genre.genre)}>{genre.genre}</div>
                  {genre.genre === hoveredGenre && (
                    <ul className="sub-dropdown">
                      <li onClick={() => handleMovieClick('genre', genre.genre, 'movies')}>Movies</li>
                      <li onClick={() => handleMovieClick('genre', genre.genre, 'webseries')}>Webseries</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li> */}
        <li className="menu-bar__item">
          <a href="/about">About</a>
          {/* <label onClick={() => scrollToBottom()}>About</label> */}
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
