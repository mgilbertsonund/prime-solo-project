// src/components/MainLayout/MainLayout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNav from '../SideNav/SideNav'; // Adjust the path as needed

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Paths where the SideNav should be hidden
  const hideSideNavPaths = ['/login', '/registration'];

  return (
    <div className="main-content">
      {!hideSideNavPaths.includes(location.pathname) && <SideNav />}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
