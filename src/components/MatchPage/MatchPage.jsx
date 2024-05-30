// src/components/MatchPage/MatchPage.js
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { arbitrageCalculator, processOddsData } from '../../utils/matchPageCalculations';
import './MatchPage.css';

const MatchPage = () => {
  const { matchId } = useParams();
  const dispatch = useDispatch();
  const { odds, loading, error } = useSelector(state => state.odds);

  useEffect(() => {
    if (!odds || odds.length === 0) {
      dispatch(fetchOddsRequest());
    }
  }, [dispatch, odds]);

  // useMemo used so only recomputed when one of the dependencies changes
  const selectedGame = useMemo(() => odds.find(game => game.id === matchId), [odds, matchId]);
  
  const processedOdds = useMemo(() => {
    if (!selectedGame) return {};
    return processOddsData(selectedGame);
  }, [selectedGame]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedGame) return <p>No game found.</p>;

  const { bookmakersData, bestAwayOdds, bestHomeOdds, bestAwayBookmaker, bestHomeBookmaker, averageAwayOdds, averageHomeOdds } = processedOdds;

  const arbitrageCalculatorVariables = processedOdds ? arbitrageCalculator(bestAwayOdds, bestHomeOdds) : null;
  const { stakeAway, stakeHome, payoutAway, payoutHome, totalStake, totalPayout, profitPercentage } = arbitrageCalculatorVariables || {};
  console.log('arb calc', arbitrageCalculatorVariables);

  return (
    <div>
      <h2>{selectedGame.away_team} vs. {selectedGame.home_team}</h2>
      <h3>Bookmaker Odds</h3>
      <div className="scroll-container">
        <table className="scroll-table">
          <thead>
            <tr>
              <th></th>
              <th>Best Odds</th>
              <th>Average Odds</th>
              {bookmakersData.map(bookmaker => (
                <th key={bookmaker.key}>{bookmaker.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{selectedGame.away_team}</th>
              <td>{bestAwayOdds} ({bestAwayBookmaker})</td>
              <td>{averageAwayOdds}</td>
              {bookmakersData.map(bookmaker => (
                <td key={`${bookmaker.key}-away`} className={bookmaker.isBetterAway ? 'better-odds' : ''}>
                  {bookmaker.awayPrice || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <th>{selectedGame.home_team}</th>
              <td>{bestHomeOdds} ({bestHomeBookmaker})</td>
              <td>{averageHomeOdds}</td>
              {bookmakersData.map(bookmaker => (
                <td key={`${bookmaker.key}-home`} className={bookmaker.isBetterHome ? 'better-odds' : ''}>
                  {bookmaker.homePrice || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="arbitrage-calculator">
        <h2>Arbitrage Calculator</h2>
        <div>
          <span>Stake for Away Team: ${stakeAway.toFixed(2)}</span>
          <span>Stake for Home Team: ${stakeHome.toFixed(2)}</span>
        </div>
        <div>
          <span>Payout for Away Team: ${payoutAway.toFixed(2)}</span>
          <span>Payout for Home Team: ${payoutHome.toFixed(2)}</span>
        </div>
        <div>
          <span>Total Stake: ${totalStake.toFixed(2)}</span>
          <span>Total Payout: ${totalPayout.toFixed(2)}</span>
          <span>Profit Percentage: {profitPercentage.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;