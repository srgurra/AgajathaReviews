/* import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css';

const PrevArrow = ({ onClick }) => (
  <div className="arrow-prev" onClick={onClick}>
    
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="arrow-next" onClick={onClick}>
    
  </div>
);

const Slideshow = () => {
  const slideImages = [
    { image: 'https://picsum.photos/id/1018/1000/600', text: 'Image 1' },
    { image: 'https://picsum.photos/id/1015/1000/600', text: 'Image 2' },
    { image: 'https://picsum.photos/id/1019/1000/600', text: 'Image 3' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % slideImages.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slide-container">
      <Slide
        indicators={true}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        onChange={(currentIndex) => {
          setActiveIndex(currentIndex);
        }}
        activeIndex={activeIndex}
      >
        {slideImages.map((slide, index) => (
          <div className="each-slide" key={index}>
            <div className="slide-content">
              <img src={slide.image} alt={slide.text} />
              <div className="slide-text">
                <strong>{slide.text}</strong>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
 */
import React, { useState, useEffect } from 'react';
import './Slideshow.css';
import SearchBar from '../SearchBar/SearchBar';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/movies/toprated');
      console.log(response);
      const data = await response.json();
      console.log(data);
      setImages(data);
      console.log(data[0].poster_url)
      console.log(data[1].poster_url)
      console.log(data[2].poster_url)
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    // Perform search functionality with the search term
    // Adjust the logic according to your needs
    console.log('Perform search with term:', searchTerm);
  };

  return (
    <div className="slideshow">
      {/* <SearchBar onSearch={handleSearch} /> */}
      {images.map((image, index) => (
        <div
          key={image.alt}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={image.poster_url} alt={image.title} />
          <div className="slide-overlay" />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
