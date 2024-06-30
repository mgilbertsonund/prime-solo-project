// LandingPage.jsx

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import './LandingPage.css'; 
import GameDetails from '../GameDetails/GameDetails'; 

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
      <h2>Games: Live & Upcoming Odds</h2>
      <ul className="games-list">
        {odds.map((game) => (
          <li key={game.id} className="game-item">
            <GameDetails
              commenceTime={game.commence_time}
              awayTeam={game.away_team}
              homeTeam={game.home_team}
              bookmakers={game.bookmakers}
              user={user}
            />
            <button onClick={() => handleClick(game.id)} className="view-odds-link">View All Odds</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;
