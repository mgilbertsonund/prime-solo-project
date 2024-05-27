import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';

const MatchPage = () => {
  const { matchId } = useParams();
  const dispatch = useDispatch();
  const { odds, loading, error } = useSelector(state => state.odds);

  useEffect(() => {
    // Fetch odds data if it's not already loaded
    if (!odds || odds.length === 0) {
      dispatch(fetchOddsRequest());
    }
  }, [dispatch, odds]);

  // Find the selected game based on the matchId
  const selectedGame = odds.find(game => game.id === matchId);
  console.log('selected game', selectedGame);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {selectedGame && (
        <>
          <h2>{selectedGame.away_team} vs. {selectedGame.home_team}</h2>
          <p>Market: Moneyline</p>
        </>
      )}
    </div>
  );
};

export default MatchPage;

