import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../Schedule/Schedule';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Standings from '../Standings/Standings';
import Players from '../Players/Players';
import BetTracker from '../BetTracker/BetTracker';
import HelpAndResources from '../HelpAndResources/HelpAndResources';
import MatchPage from '../MatchPage/MatchPage';

import SideNav from '../SideNav/SideNav'; // Import the SideNav component

import './App.css';
import Schedule from '../Schedule/Schedule';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Nav />
        <div className="main-content">
          <SideNav />
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/home" />

              <Route
                exact
                path="/schedule"
              >
                <Schedule />
              </Route>

              <Route
                exact
                path="/standings"
              >
                <Standings />
              </Route>

              <Route
                exact
                path="/players"
              >
                <Players />
              </Route>

              <Route
                exact
                path="/bet-tracker"
              >
                <BetTracker />
              </Route>

              <Route
                exact
                path="/help-&-resources"
              >
                <HelpAndResources />
              </Route>

              <ProtectedRoute
                exact
                path="/user"
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/info"
              >
                <InfoPage />
              </ProtectedRoute>

              <Route
                exact
                path="/login"
              >
                {user.id ?
                  <Redirect to="/user" />
                  :
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  <Redirect to="/user" />
                  :
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path="/home"
              >
                {user.id ?
                  <Redirect to="/user" />
                  :
                  <LandingPage />
                }
              </Route>

              <Route
                exact
                path="/matches/:matchId" 
              >
                <MatchPage />
              </Route>

              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
