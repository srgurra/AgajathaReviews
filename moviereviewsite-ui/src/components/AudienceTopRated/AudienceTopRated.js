import React, { useState, useEffect, useRef } from 'react';
import '../FromThisWeek/FromThisWeek.css';
import Thumbnail from '../ThumbnailFTW/ThumbnailFTW';
import RatingStars from 'react-rating-stars-component'; 
import { useNavigate } from 'react-router-dom';

const AudienceTopRated = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const sliderRef = useRef(null);
  const slideWidth = useRef(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    updateSliderArrows();
  }, [sliderPosition]);

  useEffect(() => {
    calculateSlideWidth();
    window.addEventListener('resize', calculateSlideWidth);
    return () => {
      window.removeEventListener('resize', calculateSlideWidth);
    };
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/movies/audiencefavs');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  const calculateSlideWidth = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      slideWidth.current = Math.floor(containerWidth / 4); // Adjust the number as per your requirement
    }
  };

  const handleNextSlide = () => {
    const maxSliderPosition = -(images.length - 4);
    if (sliderPosition > maxSliderPosition) {
      setSliderPosition((prevPosition) => prevPosition - 1);
    }
  };

  const handlePrevSlide = () => {
    if (sliderPosition < 0) {
      setSliderPosition((prevPosition) => prevPosition + 1);
    }
  };

  const updateSliderArrows = () => {
    if (sliderPosition === 0) {
      setShowLeftArrow(false);
    } else {
      setShowLeftArrow(true);
    }
    if (sliderPosition === -(images.length - 4)) {
      setShowRightArrow(false);
    } else {
      setShowRightArrow(true);
    }
  };

  const rows = [];
  for (let i = 0; i < images.length; i += 4) {
    const row = images.slice(i, i + 4);
    rows.push(row);
  }

  const handleClick = (name) => {
    console.log(name)
    navigate(`/${name}/review`);
  };

  return (
    <div className="movie-slider">
      {/* <h2 className="slider-title">Featured Movies</h2> */}
      <div className="slidertitle-strip">
        <h2 className="slidertitle">Opinions recorded</h2>
      </div>
      <div className="slider-wrapper">
      <div className="slider-container" ref={sliderRef}>
        <div className="slider" style={{ transform: `translateX(${sliderPosition * slideWidth.current}px)` }}>
          {images.map((movie) => (
            <div onClick={() => handleClick(movie.title)} className="slider-item" key={movie.id}>
              <img src={movie.postercard_url} alt={movie.title} className="slider-item-image" />
              <div className="slider-item-details">
                <h3 className="slider-item-title">{movie.title}</h3>
                {/* <p className="slider-item-description">{movie.description}</p> */}
                <RatingStars
                  count={5} // Number of stars
                  value={movie.rating} // Rating value (you need to pass this)
                  size={24} // Size of the stars
                  edit={false} // Disable user editing
                  isHalf={true} // Enable half-star ratings
                  activeColor="#ED7014" 
                />
              </div>               
            </div>
          ))}
        </div>
       </div>
       {showLeftArrow && (
          <button className="slider-control slider-control-left" onClick={handlePrevSlide}>
            &lt;
          </button>
        )}
        {showRightArrow && (
          <button className="slider-control slider-control-right" onClick={handleNextSlide}>
            &gt;
          </button>
       
       )}
       </div>
  </div>
);
};
export default AudienceTopRated;
