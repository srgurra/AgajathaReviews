import React, { useEffect, useState } from 'react';
import './FormContainer.css';
import Header from '../Header/Header';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { Storage } from 'aws-amplify';


const FormContainer = () => {
  const [authenticated, setauthenticated] = useState(sessionStorage.getItem("authenticated") || false);
  const [formValues, setFormValues] = useState({});
  const [formKey, setFormKey] = useState();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('movies'); 
  const [posterImage, setPosterImage] = useState(null);
  const [posterCard, setPosterCard] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formModelNames = {
    'Movie': 'movies',
    'Review': 'movie_reviews',
    'Language': 'movie_languages',
    'OTT': 'movie_ott',
    'Cast': 'movie_casts',
    'WebSeries': 'webseries'
  };

  const forms = [
    {
      id: 1,
      title: 'Movie',
      fields: [
        { label: 'Title', name: 'title' },
        { label: 'Genre', name: 'genre' },
        { label: 'Director', name: 'director' },
        { label: 'RunTime minutes', name: 'runtime_minutes' },
        { label: 'Release Date', name: 'release_date' },
        { label: 'Poster', name: 'poster' },
        { label: 'PosterCard', name: 'posterCard' },
        { label: 'Description', name: 'description' }
      ]
    },
    {
      id: 2,
      title: 'WebSeries',
      fields: [
        { label: 'Title', name: 'title' },
        { label: 'Genre', name: 'genre' },
        { label: 'Director', name: 'director' },
        { label: 'Season', name: 'season' },
        { label: 'Total Episodes', name: 'total_episodes' },
        { label: 'Release Date', name: 'release_date' },
        { label: 'Poster', name: 'poster' },
        { label: 'PosterCard', name: 'posterCard' },
        { label: 'Description', name: 'description' }
      ]
    },
    {
      id: 6,
      title: 'Review',
      fields: [
        { label: 'Type', name: 'type'},
        { label: 'Name', name: 'title', component: 'searchbar' },
        { label: 'Review Text', name: 'review_text' },
        { label: 'Rating', name: 'rating' },
        { label: 'Pros', name: 'pros' },
        { label: 'Cons', name: 'cons' },
        { label: 'Conclusion', name: 'conclusion' }
      ]
    },
    {
      id: 3,
      title: 'Language',
      fields: [
        { label: 'Type', name: 'type' },
        { label: 'Name', name: 'title', component: 'searchbar' },
        { label: 'Language', name: 'language_name' },
      ]
    },
    {
      id: 4,
      title: 'OTT',
      fields: [
        { label: 'Type', name: 'type' },
        { label: 'Name', name: 'title', component: 'searchbar' },
        { label: 'OTT', name: 'ott_name' },
      ]
    },
    {
      id: 5,
      title: 'Cast',
      fields: [
        { label: 'Type', name: 'type' },
        { label: 'Name', name: 'title', component: 'searchbar' },
        { label: 'Hero', name: 'hero' },
        { label: 'Heroin', name: 'heroin' },
        { label: 'Others', name: 'others' },
      ]
    }

  ];

  const [selectedForm, setSelectedForm] = useState(forms[0]);


  const handleImageUpload = (event, fieldName) => {
  console.log(fieldName);
  const selectedImage = event.target.files[0];
  if(fieldName === 'poster'){
    setPosterImage(selectedImage);
  }
  else if(fieldName === 'posterCard'){
    setPosterCard(selectedImage);
  }
  
  
};

  const handleFormSelection = (form) => {
    setSelectedForm(form);
    //console.log("Hello")
    const defaultTypeValue = form.title === 'Web Series' ? 'Web Series' : 'Movie';
  setFormValues({
    ...formValues,
    type: defaultTypeValue,
  });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (name === 'type') {
      console.log("handleformchange", value)
      setSelectedType(value === 'Movie' ? 'movies' : 'webseries');
    }


    setFormValues({
      ...formValues,
      [name]: value,
    });
  
  };

  const selectedValueDropdown = (value) => {
    setFormValues({
      ...formValues,
      title: value,
    });
    console.log("selected value form container: ", value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const modelName = formModelNames[selectedForm.title];
    const payload = new FormData(); 
    if (posterImage) {
      formValues["poster"]= posterImage
    }
    
    if (posterCard) {
      formValues["posterCard"]= posterCard
    }

    selectedForm.fields.forEach((field) => {
      payload.append(field.name, formValues[field.name]); 
    });

    
    let moviename = "";
    if (modelName === 'movies') {
      moviename = 'title';
    }
    else {
      moviename = 'movie'
    }
    let movievalue = formValues[moviename];
    console.log("payload value: ", payload)
    let url = `http://127.0.0.1:8000/api/${modelName}/update/`;
   
    // Prepare the payload
    axios.put(url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        setPosterImage(null);
        setPosterCard(null);
        setIsSubmitted(true);
        setFormValues({});
        setFormKey(Date.now() + '-' + Math.random().toString(36).substr(2, 9));
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response && error.response.data && error.response.data.error === "Movie or Web Series does not exist") {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again later.");
        }
      });

    return;
  };

  if (!authenticated || authenticated === false) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="form-container">
        <div className="form-container__header">
          <Header />
        </div>
        <div className="form-container__content">
          <div className="form-container__links">
            <h2>Select a form:</h2>
            <ul>
              {forms.map((form) => (
                <li key={form.id}>
                  <button onClick={() => handleFormSelection(form)}>{form.title}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-container__divider"></div>
          <div className="form-container__form">
            {selectedForm ? (
              <div>
                <h2>Add {selectedForm.title}</h2>
                
                <form key={formKey}>
                  {selectedForm.fields.map((field) => (
                    <div key={field.label}>
                      <label htmlFor={field.name}>{field.label}</label>

                      {field.label === 'Poster' || field.label === 'PosterCard' ? (<input type="file" accept="image/*" onChange={(e) => handleImageUpload(e,field.name)} />
                      ):field.component === 'searchbar' ? (
                          <SearchBar placeholder="" selectedValueDropdown={selectedValueDropdown} typevalue={selectedType} handleChange={handleFormChange} />
                          )

                      :field.label === "Pros" || field.label === "Cons" || field.label === "Description"|| field.label === "Review Text" || field.label === "Conclusion" ? (
                        <textarea className="form-container__textarea" id={field.name} name={field.name} onChange={handleFormChange}></textarea>
                      ) : field.label === "Release Date" ? (
                        <input type="date" id={field.name}  name={field.name}  onChange={handleFormChange} />
                      ) : field.label === "Type" ? (
                        <select id={field.name} name="type"  onChange={handleFormChange} >
                          <option value="Movie">Movie</option>
                          <option value="Web Series">Web Series</option>
                        </select>
                      ) : (
                        <input type="text" id={field.name} name={field.name} onChange={handleFormChange} />
                      )}
                    </div>
                  ))}
                  <button type="submit" onClick={handleFormSubmit}>Submit</button>
                </form>
                {error && <p className="error-message">{error}</p>}
              </div>
            ) : (
              <p>Please select a form to display</p>
            )}
          </div>
        </div>
      </div>
    );

  };
};

export default FormContainer;