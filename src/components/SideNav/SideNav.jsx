import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';

function SideNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Paths where the SideNav should be hidden
  const hideSideNavPaths = ['/login', '/register'];

  // Check if current path is in the hide list
  if (hideSideNavPaths.includes(location.pathname)) {
    return null; // Don't render the SideNav
  }

  // Toggle the SideNav
  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button to open/close the SideNav */}
      <button className="toggle-button" onClick={toggleSideNav}>
        ☰
      </button>

      {/* SideNav container */}
      <div className={`side-nav ${isOpen ? 'open' : ''}`}>
        <Link to="/schedule" onClick={toggleSideNav}>
          <h2 className="side-nav-title">Schedule</h2>
        </Link>
        <Link to="/standings" onClick={toggleSideNav}>
          <h2 className="side-nav-title">Standings</h2>
        </Link>
        <Link to="/players" onClick={toggleSideNav}>
          <h2 className="side-nav-title">Players</h2>
        </Link>
        <Link to="/bet-tracker" onClick={toggleSideNav}>
          <h2 className="side-nav-title">Bet Tracker</h2>
        </Link>
        <Link to="/help-&-resources" onClick={toggleSideNav}>
          <h2 className="side-nav-title">Help & Resources</h2>
        </Link>
      </div>
    </>
  );
}

export default SideNav;
