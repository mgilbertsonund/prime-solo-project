// src/components/LandingPage/LandingPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import data from './test'; // Adjust the path if necessary

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import SideNav from '../SideNav/SideNav';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  // Function to convert American odds to implied probability
  const americanToProbability = (odds) => {
    return odds > 0 ? 100 / (odds + 100) : -odds / (-odds + 100);
  };

  // Function to convert implied probability to American odds
  const probabilityToAmerican = (prob) => {
    return prob >= 0.5 ? -100 * (prob / (1 - prob)) : 100 * ((1 - prob) / prob);
  };

  // Function to calculate average American odds
  const calculateAverageAmericanOdds = (bookmakers, teamName) => {
    const probabilities = [];
    bookmakers.forEach((bookmaker) => {
      const market = bookmaker.markets.find(m => m.key === 'h2h');
      if (market) {
        const outcome = market.outcomes.find(o => o.name === teamName);
        if (outcome) {
          probabilities.push(americanToProbability(outcome.price));
        }
      }
    });
    if (probabilities.length === 0) return null;
    const averageProbability = probabilities.reduce((acc, prob) => acc + prob, 0) / probabilities.length;
    const averageOdds = probabilityToAmerican(averageProbability);
    return averageOdds.toFixed(0);
  };

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_1">
        </div>
        <div className="grid-col grid-col_11">
          <h2>Upcoming Games</h2>
          <ul>
            {data.map((game) => (
              <li key={game.id}>
                <h3>{game.away_team} vs. {game.home_team}</h3>
                <p>Market: Moneyline</p>
                <p>Average Away Odds: {calculateAverageAmericanOdds(game.bookmakers, game.away_team)}</p>
                <p>Average Home Odds: {calculateAverageAmericanOdds(game.bookmakers, game.home_team)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

