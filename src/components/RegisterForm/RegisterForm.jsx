import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Welcome to XXX</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
