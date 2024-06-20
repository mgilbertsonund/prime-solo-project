import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css'; 
import name from '../../assets/name.png';
import logo from '../../assets/logo.png';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
          onSuccess: () => history.push('/home'),
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <div className="formContainer"> 
      <div className="formHeader">
        <div className="branding">
          <img src={logo} alt="Logo" className="formLogo" />
          <img src={name} alt="Name" className="formName" />
        </div>
        <form className="formPanel" onSubmit={login}>
          <h2>Log in to FullStack Bets</h2>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            required
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input className="btn" type="submit" name="submit" value="Log In" />
          <center>
            Don't have an account? {` `}
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/registration');
              }}
            >
              Sign up now
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
