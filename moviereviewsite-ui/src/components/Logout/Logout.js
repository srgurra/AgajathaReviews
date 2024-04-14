import React from 'react';
import axios from 'axios';
import './Logout.css';

function Logout() {
  const handleClick = () => {
    axios.post('http://127.0.0.1:8000/api/logout/')
      .then(response => {
        sessionStorage.clear();
        window.location.href = '/';
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <button className="logout" onClick={handleClick}>Logout</button>
  );
}

export  default Logout;
