// GameDetails.jsx

import React from 'react';
import { calculateAverageAmericanOdds } from '../../utils/oddsCalculations';
import './GameDetails.css';

const GameDetails = ({ commenceTime, awayTeam, homeTeam, bookmakers, user }) => {
  return (
    <div className="game-details">
      <div className="game-column">
        <p className="commence-time">{new Date(commenceTime).toLocaleString()}</p>
        <p>{awayTeam}</p>
        <p>{homeTeam}</p>
      </div>

      <div className={`odds-column ${!user.id ? 'blurred' : ''}`}>
        <p className="market">Moneyline</p>
        <p>{user.id ? calculateAverageAmericanOdds(bookmakers, awayTeam) : 'Login to see'}</p>
        <p>{user.id ? calculateAverageAmericanOdds(bookmakers, homeTeam) : 'Login to see'}</p>
      </div>
    </div>
  );
};

export default GameDetails;
