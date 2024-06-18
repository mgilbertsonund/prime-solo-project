import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { calculateAverageAmericanOdds } from '../../utils/oddsCalculations';
import './LandingPage.css'; 

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { odds, loading, error } = useSelector(store => store.odds);
  const user = useSelector(store => store.user);

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
            <div className="game-details">
              <p className="commence-time">{new Date(game.commence_time).toLocaleString()}</p>
              <h3>{game.away_team}</h3>
              <h3>{game.home_team}</h3>
            </div>
            <div className={`odds-info ${!user.id ? 'blurred' : ''}`}>
              <div className='odds-data'>
                <p>Moneyline</p>
                <p>{user.id ? calculateAverageAmericanOdds(game.bookmakers, game.away_team) : 'Login to see'}</p>
                <p>{user.id ? calculateAverageAmericanOdds(game.bookmakers, game.home_team) : 'Login to see'}</p>
              </div>
            </div>
            <button onClick={() => handleClick(game.id)} className="view-odds-link">View All Odds</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
