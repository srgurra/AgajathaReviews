import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [authenticated, setauthenticated] = useState(sessionStorage.getItem(sessionStorage.getItem("authenticated")|| false));

  const handleSubmit = (event) => {
    event.preventDefault();
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    //axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    //axios.post('http://127.0.0.1:8000/authentication/api/login/', { username, password}, { withCredentials: true })
    const data = new URLSearchParams();
    data.append('username', document.querySelector('input[name="username"]').value,);
    data.append('password', document.querySelector('input[name="password"]').value);
    axios.post('http://127.0.0.1:8000/api/login/', data)
    .then(response => {
      console.log(response.data);
      if (response.data['success']===true){
        setauthenticated(true);
        sessionStorage.setItem("authenticated", true);
        window.location.href = '/forms';
      }
      else{
        setError(true);
      } 
    })
    .catch(error => {
      console.log(error)
      if (error.response.status === 404) {
        console.log('Endpoint not found');
      } else {
        console.log(error);
      }
    });
  }
  return (
    <div className="login-form">
      <div className="login-form__box">
        <h1 className="login-form__title">Login</h1>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="login-form__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-form__button" onClick={handleSubmit}>Submit</button>
        {error && <p className="error-message">User credentials are wrong</p>}
        <div className="login-form__forgot-password">Forgot password?</div>
      </div>
    </div>
  );
}
export default Login;