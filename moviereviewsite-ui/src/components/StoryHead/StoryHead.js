import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryHead.css';

const StoryHead = () => {
  const navigate = useNavigate();
  const title= "Budugu"
  const handleClick = () => {
    navigate(`/story/${title}`);
  };

  /* return (
    <div className="short-story" onClick={handleClick}>
      <div className="short-story-content">
        <div className="short-story-image-container">
          <img src='https://d2j6dbq0eux0bg.cloudfront.net/images/11503874/611438038.jpg' alt="Short Story" className="short-story-image" />
        </div>
        <div className="short-story-info">
          <h3 className="short-story-title">Budugu</h3>
          <p className="short-story-description">Story of boy explaining his struggles</p>
        </div>
      </div>
    </div>
  ); 
  return (
    <div className="image-text-container" onClick={handleClick}>
      <div className="image-container">
        <img src="https://d2j6dbq0eux0bg.cloudfront.net/images/11503874/611438038.jpg" alt="ShortStory" />
      </div>
      <div className="text-container">
        <p>Your text goes here.</p>
      </div>
    </div>
  ); */
  return (
    <div>
    <div className="slidertitle-strip">
        <h2 className="slidertitle">A Short Story</h2>
      </div>
    <div className="article-preview" onClick={handleClick}>
    <div className="article-content">
      <img src='https://d2j6dbq0eux0bg.cloudfront.net/images/11503874/611438038.jpg' alt="Article" className="article-image" />
      <div className="article-details">
      <h2 className="article-title">Budugu</h2>
      <p className="article-description">Its a story of a 3 year boy who expresses his problems while his parents try to discpline him</p>
    </div>
    </div>
    </div>
    </div>
  );

};

export default StoryHead;
