import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MatchPage = () => {
  const { matchId } = useParams();
  const games = useSelector(state => state.odds[matchId]);

  const game = games.find(game => game.away_team === matchId || game.home_team === matchId);

  return (
    <div>
      {game && (
        <div>
          <h2>{game.away_team} vs. {game.home_team}</h2>
          <p>Market: Moneyline</p>
          {game.bookmakers.map(bookmaker => (
            <div key={bookmaker.key}>
              <h3>{bookmaker.title}</h3>
              <ul>
                {bookmaker.markets.map(market => (
                  <li key={market.key}>
                    <p>Market: {market.key}</p>
                    {/* Render other market details */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchPage;

