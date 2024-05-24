import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideNav () {
    return (
        <div className="side-nav">
            <Link to="/home">
                <h2 className="side-nav-title">Schedule</h2>
            </Link>
            <Link to="/about">
              <h2 className="side-nav-title">Standings</h2>
            </Link>
            <Link to="/info">
                <h2 className="side-nav-title">Players</h2>
            </Link>
            <Link to="/info">
                <h2 className="side-nav-title">Bet Tracker</h2>
            </Link>
            <Link to="/info">
                <h2 className="side-nav-title">Help & Resources</h2>
            </Link>
        </div>
    )
}

export default SideNav;