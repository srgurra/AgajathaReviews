
//import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  Logout  from './components/Logout/Logout';
import  Login   from './components/Login/Login';
import  Home   from './components/Home/Home';
import  FormContainer   from './components/FormContainer/FormContainer';
import React, { useState } from 'react';
import ListingPage from './components/MovieListing/ListingPage';
import ShortStory from './components/ShortStory/ShortStory';
import HeaderHome from './components/HeaderHome/HeaderHome';
import MovieReview from './components/MovieReview/MovieReview';
import OttPage from './components/MovieListing/OttPage';
import LanguagesPage from './components/MovieListing/LanguagesPage';
import GenrePage from './components/MovieListing/GenrePage';
import DataProvider from './components/DataProvider/DataProvider';


function App() {

  return (
    <BrowserRouter>
    <DataProvider>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/forms" element={<FormContainer />} />
      <Route path="/logout" element={<Logout  /> } />
      <Route path="/home" element={<Home/> } />
      <Route path="/ott" element={<OttPage />} />
      <Route path="/languages" element={<LanguagesPage />} />
      <Route path="/genre" element={<GenrePage />} />
      <Route path="/ott/:ott" element={<ListingPage />} />
      <Route path="/language/:language" element={<ListingPage />} />
      <Route path="/genre/:genre" element={<ListingPage />} />
      <Route path="/story/:storytitle" element={<ShortStory />} />
      <Route path="/:moviename/review" element={<MovieReview />} />

    </Routes>
    </DataProvider>
  </BrowserRouter>
  );
}

export default App;

