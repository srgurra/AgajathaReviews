import React, { useEffect, useState } from 'react';
import ThumbnailFTW from '../ThumbnailFTW/ThumbnailFTW';
import HeaderHome from '../HeaderHome/HeaderHome';
import { useLocation } from 'react-router-dom';
import './ListingPage.css';
import LoaderGif from '../../assets/loader.gif';

const ListingPage = () => {
  const [dropDownValue, setDropDownValue] = useState();
  const [tabValue, setTabValue] = useState('');
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [filterTiles, setFilterTiles] = useState();
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterValue, setFilterValue] = useState();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const ottTilesApi = 'http://127.0.0.1:8000/api/movies/unique-ott-poster';
  const languageTilesApi = 'http://127.0.0.1:8000/api/movies/unique-language-poster';
  const genreTilesApi = 'http://127.0.0.1:8000/api/movies/unique-genre-poster';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(`http://127.0.0.1:8000/api/movies/${tabValue}/?${tabValue}=${dropDownValue}`)
        // const response = await fetch(`http://127.0.0.1:8000/api/movies/${tabValue}/?${tabValue}=${dropDownValue}`);
        const response = dropDownValue && await fetch(`http://127.0.0.1:8000/api/movie_${dropDownValue}/all`);
        const data = response && await response.json();
        const responseFilterTiles = dropDownValue && await fetch(dropDownValue === 'ott' ? ottTilesApi : dropDownValue === 'languages' ? languageTilesApi : genreTilesApi);
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        console.log(data, dataFilterTiles);
        setMovies(data);
        setFilterTiles(dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };



    const parseURL = () => {
      const url = window.location.pathname;
      const urlParts = url.split('/');
      const tabValueIndex = urlParts.length - 2;
      const dropDownValueIndex = urlParts.length - 1;

      setDropDownValue(urlParts[dropDownValueIndex]);
      setTabValue(urlParts[tabValueIndex]);
    };

    parseURL();
    fetchData();
  }, [location]); // Add window.location.pathname as a dependency


  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`http://127.0.0.1:8000/api/movies/${tabValue}/?${tabValue}=${dropDownValue}`);
        const response = dropDownValue && await fetch(`http://127.0.0.1:8000/api/movie_${dropDownValue}/all`);
        const data = response && await response.json();
        const responseFilterTiles = dropDownValue && await fetch(dropDownValue === 'ott' ? ottTilesApi : dropDownValue === 'languages' ? languageTilesApi : genreTilesApi);
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        setMovies(data);
        setFilterTiles(dataFilterTiles);
        console.log("data filter: ", dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };

    const parseURL = () => {
      const url = window.location.pathname;
      const urlParts = url.split('/');
      const tabValueIndex = urlParts.length - 2;
      const dropDownValueIndex = urlParts.length - 1;

      setDropDownValue(urlParts[dropDownValueIndex]);
      setTabValue(urlParts[tabValueIndex]);
    };

    parseURL();
    fetchData();
  }, [dropDownValue, tabValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;
        const responseFilterTiles = dropDownValue && await fetch(dropDownValue === 'ott' ? ottTilesApi : dropDownValue === 'languages' ? languageTilesApi : genreTilesApi);
        const dataFilterTiles = responseFilterTiles && await responseFilterTiles.json();
        if (filterApplied === true) {
          response = await fetch(`http://127.0.0.1:8000/api/movies/${dropDownValue}/?${dropDownValue}=${filterValue}`);
        } else {
          response = dropDownValue && await fetch(`http://127.0.0.1:8000/api/movie_${dropDownValue}/all`);
        }
        // const response = dropDownValue && await fetch(`http://127.0.0.1:8000/api/movie_${dropDownValue}/all`);
        const data = response && await response.json();
        setMovies(data);
        setFilterTiles(dataFilterTiles);
        console.log("data filter: ", dataFilterTiles);
      } catch (error) {
        console.log(error);
      }
    };

    const parseURL = () => {
      const url = window.location.pathname;
      const urlParts = url.split('/');
      const tabValueIndex = urlParts.length - 2;
      const dropDownValueIndex = urlParts.length - 1;

      setDropDownValue(urlParts[dropDownValueIndex]);
      setTabValue(urlParts[tabValueIndex]);
    };

    parseURL();
    fetchData();
  }, [filterApplied, filterValue, dropDownValue, tabValue])

  const handleFilterClick = async (filterValue) => {
    // Check if any filters are selected before setting filterApplied to false
    const anyFilterSelected = filterTiles.some((filterTile) =>
      filterTile[dropDownValue === 'ott' ? 'ott_name' : dropDownValue === 'languages' ? 'language_name' : 'genre'] === filterValue
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
  };



  return (
    <>
        <div>
          <HeaderHome />
          <div className="heading-strip">
            {/* <h2 className="heading">{headingText}</h2> */}
            <div className="filterbuttons">
              {filterTiles && filterTiles.map((filterTile, index) => {
                console.log(`filterTiles in render ${dropDownValue}: `, filterTile)
                return <button
                  style={{
                    backgroundColor:
                      filterTile[dropDownValue === 'ott'
                        ? 'ott_name'
                        : dropDownValue === 'languages'
                          ? 'language_name'
                          : 'genre'] === selectedFilter
                        ? '#FF9800' // Apply the background color to the selected filter
                        : 'white', // Default background color for other filters
                  }}
                  className='filterbutton' onClick={() => handleFilterClick(filterTile[dropDownValue === 'ott' ? 'ott_name' : dropDownValue === 'languages' ? 'language_name' : 'genre'])}
                >
                  {filterTile[dropDownValue === 'ott' ? 'ott_name' : dropDownValue === 'languages' ? 'language_name' : dropDownValue === 'genre' && 'genre']}
                </button>
              })
            }
            </div>
          </div>
          <div className="from-this-week">
            <div className="from-this-week__thumbnails">
              {movies && movies.map((movie, index) => (
                <div className="from-this-week__row" key={index}>
                  <ThumbnailFTW src={movie.postercard_url} name={movie.movie_title} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default ListingPage;
