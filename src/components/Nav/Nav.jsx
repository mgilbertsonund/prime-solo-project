import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png'; 
import name from '../../assets/name.png';
import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home" className="nav-logo-container">
        <img src={logo} className="nav-logo" alt="Logo"/>
        <img src={name} alt="FullStack Bets" className="nav-logo"/>
      </Link>
      <div>
        {!user.id && (
          <Link className="navLink" to="/login">
            <button>Login / Register</button>
          </Link>
        )}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              <button>User Page</button>
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
