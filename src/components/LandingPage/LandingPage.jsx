import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { calculateAverageAmericanOdds } from '../../utils/oddsCalculations';

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { odds, loading, error } = useSelector(state => state.odds);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchOddsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (gameId) => {
    if (user.id) {
      history.push(`/matches/${gameId}`);
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="container">
      <h2>Upcoming Games</h2>
      <ul className="games-list">
        {odds.map((game) => (
          <li key={game.id} className="game-item">
            <h3>{game.away_team} vs. {game.home_team}</h3>
            {user.id ? (
              <>
                <p>Market: Moneyline</p>
                <p>Average Away Odds: {calculateAverageAmericanOdds(game.bookmakers, game.away_team)}</p>
                <p>Average Home Odds: {calculateAverageAmericanOdds(game.bookmakers, game.home_team)}</p>
              </>
            ) : (
              <p>Please log in to view odds</p>
            )}
            <button onClick={() => handleClick(game.id)} className="view-odds-link">View All Odds</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
