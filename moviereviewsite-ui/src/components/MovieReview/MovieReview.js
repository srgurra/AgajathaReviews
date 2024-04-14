import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RatingStars from 'react-rating-stars-component';
import './MovieReview.css';
import HeaderHome from '../HeaderHome/HeaderHome';

const MovieReview = () => {
  const [reviewData, setReviewData] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const url = window.location.pathname;
  const urlParts = url.split('/');
  const title = urlParts[urlParts.length - 2];

  const fetchTextFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch text file: ${response.status}`);
      }
      const textData = await response.text();
      return textData;
    } catch (error) {
      console.error("Error fetching text file:", error);
      return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Rating:', rating);
    console.log('Review Text:', reviewText);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting review")
        const response = await fetch(`http://127.0.0.1:8000/api/movies/description/?movie_title=${title}`);
        const data = await response.json();
        const fetchReviewText = fetchTextFile(data[0].review_text);
        const fetchPros = fetchTextFile(data[0].pros);
        const fetchCons = fetchTextFile(data[0].cons);
        const fetchConclusion = fetchTextFile(data[0].conclusion);
        Promise.all([fetchReviewText, fetchPros, fetchCons, fetchConclusion])
          .then(([reviewText, prosText, consText, conclusionText]) => {
            setReviewData({
              ...data, // Keep other data from reviewData
              review_text: reviewText,
              pros: prosText,
              cons: consText,
              conclusion: conclusionText,
            });
          })
          .catch((error) => {
            console.error("Error fetching text files:", error);
          });
        //setReviewData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [title]); // Add title as a dependency

  console.log(reviewData)
  console.log(`url(${(reviewData && reviewData[0].poster_url)})`)



  return (
    <>
      <div>
        < HeaderHome />
        <div class="movie-card">

          <div class="container">

            <a href="#"><img src={reviewData && reviewData[0].postercard_url} alt="cover" class="cover" /></a>


            <div style={{ background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) 0% 100%,  url(${(reviewData && reviewData[0].poster_url.replace(/\s/g, '%20'))})` }} class="hero">

              <div class="details">

                <div class="title1">{reviewData && reviewData[0].title} <span class="pagenumber">PG-13</span></div>

                <div class="title2">The Battle of the Five Armies</div>

                <RatingStars
                  count={5} // Number of stars
                  value={reviewData && reviewData[0].rating} // Rating value (you need to pass this)
                  size={24} // Size of the stars
                  edit={false} // Disable user editing
                  isHalf={true} // Enable half-star ratings
                  activeColor="#ED7014"
                />
                <span class="likes">109 likes</span>
              </div>

            </div>

            <div class="description">

              <div class="column1">
                <span class="tag">{reviewData && reviewData[0].genre.split(',').map((genre, index) => (
                    <button key={index} className="genre-button">{genre.trim()}</button>
                ))}</span>
              </div>

              <div class="column2">
                <p>{reviewData && reviewData[0].description}</p>
                <p>{reviewData && reviewData.review_text}</p>
                <p>{reviewData && reviewData.pros}</p>
                <p>{reviewData && reviewData.cons}</p>
                <p>{reviewData && reviewData.conclusion}</p>
                <div class="avatars">
                  <a href="#" data-tooltip="Person 1" data-placement="top">
                    <img class="descposter" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar1.png" alt="avatar1" />
                  </a>

                  <a href="#" data-tooltip="Person 2" data-placement="top">
                    <img class="descposter" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar2.png" alt="avatar2" />
                  </a>


                  <a href="#" data-tooltip="Person 3" data-placement="top">
                    <img class="descposter" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/hobbit_avatar3.png" alt="avatar3" />
                  </a>

                </div>
                <div className="review-form-container">
              
                <form className='movie-review-form' onSubmit={handleSubmit}>
                  <h1>Leave a Review</h1>
                  <div className="form-group rating-group">
                    <label htmlFor="rating">Rating : </label>
                    <RatingStars className = "ratingstars"
                      count={5}
                      value={rating}
                      size={24}
                      edit={true}
                      isHalf={true}
                      activeColor="#ED7014"
                      onChange={(newRating) => setRating(newRating)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reviewText">Review : </label>
                    <textarea
                      id="reviewText"
                      name="reviewText"
                      rows="6"
                      cols="90"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button type="submit">Submit</button>
                  </div>
                </form>
            </div> 

                



              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );

};

export default MovieReview;
