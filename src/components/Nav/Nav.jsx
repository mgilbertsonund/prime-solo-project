import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import name from '../../assets/name.png';
import userIcon from '../../assets/user.png';
import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Check if current path is in the hide list
  const hideNavPaths = ['/login', '/registration'];

  if (hideNavPaths.includes(location.pathname)) {
    return null; // Don't render the Nav
  }

  return (
    <div className="nav">
      <Link to="/home" className="nav-logo-container">
        <img src={logo} className="nav-logo" alt="Logo"/>
        <img src={name} alt="FullStack Bets" className="nav-logo-name"/>
      </Link>
      <div className="nav-links">
        {!user.id && (
          <Link className="navLink" to="/login">
            <button className="navButton">Login / Register</button>
          </Link>
        )}
        {user.id && (
          <div className="logged-in">
            <div className="user-dropdown">
              <img
                src={userIcon}
                alt="User"
                className="user-icon"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link className="dropdownLink" to="/user">
                    Manage Bookmakers
                  </Link>
                  <LogOutButton className="dropdownLink" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
