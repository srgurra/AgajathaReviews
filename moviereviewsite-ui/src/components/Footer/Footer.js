import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/logo1.png" alt="My Movie App" />
      </div>
      <div className="footer__content">
        <div className="footer__section">
          <h3>About Us</h3>
          <p>
            My Movie App is your go-to destination for all things movies. 
            Explore our vast collection, discover new releases, and stay up 
            to date with the latest movie news and reviews.
          </p>
        </div>
        <div className="footer__section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/movies">Movies</a></li>
            <li><a href="/genres">Genres</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow Us</h3>
          <div className="footer__social-icons">
            <a href="https://www.facebook.com/my-movie-app">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com/my-movie-app">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/my-movie-app">
              < FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__legal">
          <span>&copy; {new Date().getFullYear()} Agajatha Reviews. All rights reserved.</span>
          <span>Privacy Policy | Terms of Service</span>
        </div>
        <div className="footer__credits">
          <span>Website designed and developed by</span>
          <a href="https://www.mywebstudio.com">MyWebStudio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
