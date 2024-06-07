import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import AboutPage from '../Schedule/Schedule';
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
import Schedule from '../Schedule/Schedule';
import MainLayout from '../MainLayout/MainLayout'; 

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
        <div className="app-body">
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route exact path="/schedule">
              <MainLayout>
                <Schedule />
              </MainLayout>
            </Route>

            <Route exact path="/standings">
              <MainLayout>
                <Standings />
              </MainLayout>
            </Route>

            <Route exact path="/players">
              <MainLayout>
                <Players />
              </MainLayout>
            </Route>

            <Route exact path="/bet-tracker">
              <MainLayout>
                <BetTracker />
              </MainLayout>
            </Route>

            <Route exact path="/help-&-resources">
              <MainLayout>
                <HelpAndResources />
              </MainLayout>
            </Route>

            <ProtectedRoute exact path="/user">
              <MainLayout>
                <UserPage />
              </MainLayout>
            </ProtectedRoute>

            <ProtectedRoute exact path="/info">
              <MainLayout>
                <InfoPage />
              </MainLayout>
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? <Redirect to="/home" /> : <LoginPage />}
            </Route>

            <Route exact path="/registration">
              {user.id ? <Redirect to="/home" /> : <RegisterPage />}
            </Route>

            <Route exact path="/home">
              <MainLayout>
                <LandingPage />
              </MainLayout>
            </Route>

            <Route exact path="/matches/:matchId">
              <MainLayout>
                <MatchPage />
              </MainLayout>
            </Route>

            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
