import React, { useState, useEffect } from 'react';
import './Highlights.css';

const Highlights = () => {
    const [highlights, setImages] = useState([]);
    useEffect(() => {
        fetchImages();
      }, []);
    const fetchImages = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/movies/toprated');
          const data = await response.json();
          setImages(data);
        } catch (error) {
          console.log('Error fetching images:', error);
        }
      };


  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % highlights.length);
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="slideshow-container">
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          {/* Slide content goes here */}
          <img src={highlight.poster_url} alt={highlight.title} className="poster-image"/>
          <div className="highlight-details">
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
