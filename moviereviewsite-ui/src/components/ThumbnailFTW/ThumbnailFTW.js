import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import RatingStars from 'react-rating-stars-component'; 
import './ThumbnailFTW.css';

const ThumbnailFTW = ({ src, name }) => {
  const navigate = useNavigate();
  const title= "poratam"
  const handleClick = (name) => {
    console.log(name)
    navigate(`/${name}/review`);
  };
  return (
    /* {/* <div className="slider-item" key={movie.id}>
              <img src={src} alt={name} className="slider-item-image" onClick={() => handleClick(name)}/>
              <div className="slider-item-details">
                <h3 className="slider-item-title">{name}</h3>
                
                <RatingStars
                  count={5} // Number of stars
                  value={rating} // Rating value (you need to pass this)
                  size={24} // Size of the stars
                  edit={false} // Disable user editing
                  isHalf={true} // Enable half-star ratings
                  activeColor="#ED7014" 
                />
              </div>           
            </div>
 */
   <div className="thumbnailftw-container">
      <img className="thumbnailftw-image"  onClick={() => handleClick(name)} src={src} alt={name}/>
      <div className="slider-item-details">
                <h3 className="slider-item-title">{name}</h3>
                
                <RatingStars
                  count={5} // Number of stars
                  value={2} // Rating value (you need to pass this)
                  size={24} // Size of the stars
                  edit={false} // Disable user editing
                  isHalf={true} // Enable half-star ratings
                  activeColor="#ED7014" 
                />
              </div>  
    </div> 
  );
};

ThumbnailFTW.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ThumbnailFTW;
