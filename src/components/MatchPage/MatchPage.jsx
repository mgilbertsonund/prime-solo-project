import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOddsRequest } from '../../redux/actions/odds.actions'; 
import './MatchPage.css'; 

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!selectedGame) return <p>No game found.</p>;

  // Find Pinnacle's odds
  const pinnacle = selectedGame.bookmakers.find(bookmaker => bookmaker.key === 'pinnacle');
  const pinnacleAwayOdds = pinnacle?.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.away_team)?.price;
  const pinnacleHomeOdds = pinnacle?.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.home_team)?.price;

  const isBetterOdds = (price, pinnaclePrice, isPositive) => {
    if (isPositive) {
      return price > pinnaclePrice;
    }
    return price > pinnaclePrice;
  };

  return (
    <div>
      <h2>{selectedGame.away_team} vs. {selectedGame.home_team}</h2>
      <h3>Bookmaker Odds</h3>
      <div className="scroll-container">
        <table className="scroll-table">
          <thead>
            <tr>
              <th></th>
              {selectedGame.bookmakers.map(bookmaker => (
                <th key={bookmaker.key}>{bookmaker.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedGame.away_team}</td>
              {selectedGame.bookmakers.map(bookmaker => {
                const awayPrice = bookmaker.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.away_team)?.price;
                return (
                  <td key={`${bookmaker.key}-away`} className={
                    bookmaker.key !== 'pinnacle' && 
                    isBetterOdds(awayPrice, pinnacleAwayOdds, pinnacleAwayOdds > 0) ? 
                    'better-odds' : ''
                  }>
                    {awayPrice || 'N/A'}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>{selectedGame.home_team}</td>
              {selectedGame.bookmakers.map(bookmaker => {
                const homePrice = bookmaker.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.home_team)?.price;
                return (
                  <td key={`${bookmaker.key}-home`} className={
                    bookmaker.key !== 'pinnacle' && 
                    isBetterOdds(homePrice, pinnacleHomeOdds, pinnacleHomeOdds > 0) ? 
                    'better-odds' : ''
                  }>
                    {homePrice || 'N/A'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchPage;
