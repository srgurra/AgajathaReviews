import React, { useEffect, useState } from 'react';
import ThumbnailFTW from '../ThumbnailFTW/ThumbnailFTW';
import HeaderHome from '../HeaderHome/HeaderHome';
import { useLocation } from 'react-router-dom';
import './ListingPage.css';
import LoaderGif from '../../assets/loader.gif';

const OttPage = () => {
  /* const [tabValue, setTabValue] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [filterTiles, setFilterTiles] = useState();
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterValue, setFilterValue] = useState();
  const [selectedFilter, setSelectedFilter] = useState("null"); */

  const [otts, setotts] = useState([]);
  const [selectedOtt, setselectedOtt] = useState('All');
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setselectedMovies] = useState([]);


  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/movie_ott/all`);
        const data = response && await response.json();
        const responseFilterTiles = await fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster');
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        console.log(data, dataFilterTiles);
        setMovies(data);
        setFilterTiles(dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]); // Add window.location.pathname as a dependency


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/movie_ott/all`);
        const data = response && await response.json();
        const responseFilterTiles = await fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster');
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        setMovies(data);
        setFilterTiles(dataFilterTiles);
        console.log("data filter: ", dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;
        const responseFilterTiles = await fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster');
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        if (filterApplied === true) {
          response = await fetch(`http://127.0.0.1:8000/api/movies/ott/?ott=${filterValue}`);
        } else {
          response = await fetch(`http://127.0.0.1:8000/api/movie_ott/all`);
        }
        const data = response && await response.json();
        setMovies(data);
        setFilterTiles(dataFilterTiles);
        console.log("data filter: ", dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filterApplied, filterValue])

  const handleFilterClick = async (filterValue) => {
    // Check if any filters are selected before setting filterApplied to false
    const anyFilterSelected = filterTiles.some((filterTile) =>
      filterTile['ott_name'] === filterValue
    );

    setFilterValue(filterValue);
    if (selectedFilter === filterValue) {
      // Deselect the filter
      setSelectedFilter(null);
      setFilterApplied(false); // No filter selected, set filterApplied to false
    } else {
      // Select a new filter
      setSelectedFilter(filterValue);
      setFilterApplied(anyFilterSelected); // Set filterApplied based on whether any filter is selected
    }
  }; */

  useEffect(() => {
    // Fetch unique genres from the Django API
    fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster')
        .then(response => response.json())
        .then(data=> {
        setotts(data);
        console.log("response from unique otts",otts)
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });

    // Fetch all movies from the Django API
    fetch(`http://127.0.0.1:8000/api/movies/ott/?ott=${selectedOtt}`)
        .then(response => response.json())
        .then(data=> {
        setMovies(data);
        setselectedMovies(data)
      })
      .catch(error => {
        console.error('Error fetching all movies:', error);
      });
  }, []);

  useEffect(() => {
    // Filter movies based on the selected genre
    if (selectedOtt === 'All') {
      //setMovies(movies); // Display all movies
      setselectedMovies(movies)
    } else {
      const filteredMovies = movies.filter(movie => movie.ott_name === selectedOtt);
      console.log("filtered movies", filteredMovies)
      setselectedMovies(filteredMovies);
    }
  }, [selectedOtt]);



  return (
    <>
        <div>
          <HeaderHome />
          <div className="heading-strip">
            {/* <h2 className="heading">{headingText}</h2> */}
            <div className="filterbuttons">
            {otts.map(ott => (
                <button
                    style={{
                        backgroundColor:
                        ott === selectedOtt
                            ? '#FF9800' // Apply the background color to the selected filter
                            : 'white', // Default background color for other filters
                    }}
                    key={ott}
                    onClick={() => setselectedOtt(ott)}
                    className='filterbutton'
                >
                    {ott}
                </button>
            ))}
            </div>
          </div>
          <div className="from-this-week">
            <div className="from-this-week__thumbnails">
              {selectedMovies && selectedMovies.map(movie => (
                <div className="from-this-week__row" >
                  <ThumbnailFTW src={movie.postercard_url} name={movie.movie_title} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default OttPage;
