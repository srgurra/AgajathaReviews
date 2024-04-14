import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({selectedValueDropdown, placeholder, typevalue}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
 

  const handleChange = (event, { newValue }) => {
    setSearchTerm(newValue);
    console.log("Selected value: ", newValue)
    selectedValueDropdown(newValue)
  };


  const handleSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${typevalue}/suggestions?term=${value}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: placeholder,
    value: searchTerm,
    onChange: handleChange,
  };

  return (
    <div className="search-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
