import React, { useEffect, useState, useRef } from 'react';
import './MoviesReel.css';

const MoviesReel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const filmRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movies/unique-genre-poster');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filmDiv = filmRef.current;
    const filmWidth = filmDiv.offsetWidth;

    const numBoxes = Math.floor(filmWidth / 14); // Adjust the box spacing as needed
    const boxShadowValues = Array.from({ length: numBoxes }, (_, index) => `${index * 14}px 0px 0px #5e5e5e`).join(', ');

    filmDiv.style.setProperty('--box-shadow-values', boxShadowValues);
  }, [images]);

  const handleNext = () => {
    const nextIndex = currentIndex + 4;
    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };

  const handlePrevious = () => {
    const previousIndex = currentIndex - 4;
    if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  const displayImages = images.slice(currentIndex, currentIndex + 4);

  return (
    <>
      <div className="heading-strip">
        <h2 className="heading">Movies from this Week</h2>
      </div>
        
      <div className="film" ref={filmRef}>
        {displayImages.map((image, index) => (
          <div key={index} className={`image-container ${index === 0 ? 'active' : ''}`}>
            <img className="movie-poster" src={image.poster_url} alt={`Movie ${index + 1}`} />
          </div>
        ))}
        <button className="arrow left" onClick={handlePrevious} disabled={currentIndex === 0}>
          &lt;
        </button>
        <button className="arrow right" onClick={handleNext} disabled={currentIndex >= images.length - 4}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default MoviesReel;
