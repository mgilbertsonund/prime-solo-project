import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RegisterForm.css'; // Import the CSS file for RegisterForm styling
import name from '../../assets/name.png';
import logo from '../../assets/logo.png';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      dispatch({ type: 'REGISTRATION_FAILED', payload: 'Passwords do not match' });
      return;
    }
    if (username.length < 4 || password.length < 8) {
      dispatch({ type: 'REGISTRATION_FAILED', payload: 'Username must be at least 4 characters and password at least 8 characters long' });
      return;
    }

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        onSuccess: () => history.push('/home'),  // Navigate to LandingPage on success
      },
    });
  };

  return (
    <div className="formContainer"> 
      <div className="formHeader">
        <div className="branding">
          <img src={logo} alt="Logo" className="formLogo" />
          <img src={name} alt="Name" className="formName" />
        </div>
        <form className="formPanel" onSubmit={registerUser}>
          <h2>Welcome to FullStack Bets</h2>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            required
            placeholder="Choose a username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            required
            placeholder="Enter a password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            required
            placeholder="Confirm your password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <input className="btn" type="submit" name="submit" value="Register" />
          <center>
            Already have an account? {` `}
            <button
              type="button"
              className="btn btn_asLink"
              onClick={() => {
                history.push('/login');
              }}
            >
              Log in instead
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

