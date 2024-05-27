import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { calculateAverageAmericanOdds } from '../../utils/oddsCalculations';

function LandingPage() {
  const dispatch = useDispatch();
  const { odds, loading, error } = useSelector(state => state.odds);

  useEffect(() => {
    dispatch(fetchOddsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_1"></div>
        <div className="grid-col grid-col_11">
          <h2>Upcoming Games</h2>
          <ul>
            {odds.map((game) => (
              <li key={game.id}>
                <h3>{game.away_team} vs. {game.home_team}</h3>
                <p>Market: Moneyline</p>
                <p>Average Away Odds: {calculateAverageAmericanOdds(game.bookmakers, game.away_team)}</p>
                <p>Average Home Odds: {calculateAverageAmericanOdds(game.bookmakers, game.home_team)}</p>
                <Link to={`/matches/${game.id}`}>View All Odds</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

