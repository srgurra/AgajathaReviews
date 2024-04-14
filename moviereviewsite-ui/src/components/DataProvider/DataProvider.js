// DataProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data here and store it in the 'data' state
    const fetchData = async () => {
      try {
        const response1 = await fetch('http://127.0.0.1:8000/api/movies/unique-ott-poster');
        const ottData = response1 && (await response1.json());
        const response2 = await fetch('http://127.0.0.1:8000/api/movies/unique-language-poster');
        const languageData = response2 && (await response2.json());
        const response3 = await fetch('http://127.0.0.1:8000/api/movies/unique-genre-poster');
        const genreData = response3 && (await response3.json());

        setData({ ottData, languageData, genreData });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
