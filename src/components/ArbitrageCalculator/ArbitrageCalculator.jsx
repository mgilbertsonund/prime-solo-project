import React from 'react';
import './ArbitrageCalculator.css'; 

const ArbitrageCalculator = ({ awayTeam, homeTeam, bestAwayBookmaker, bestHomeBookmaker, arbitrageCalculatorVariables }) => {
  if (!arbitrageCalculatorVariables) return null;

  const { stakeAway, stakeHome, payoutAway, payoutHome, totalStake, totalPayout, profitPercentage, hasArbitrageOpportunity } = arbitrageCalculatorVariables;
  const arbitrageStyle = hasArbitrageOpportunity ? 'arbitrage-opportunity' : 'no-arbitrage';

  return (
    <div className={`arbitrage-calculator ${arbitrageStyle}`}>
      <div className="card">
        <h2>Suggested Arbitrage Bets</h2>
        <div className="card-content">
          <div className="card-section">
            <span>{awayTeam}: ${stakeAway} - {bestAwayBookmaker}</span>
            <span>{homeTeam}: ${stakeHome} - {bestHomeBookmaker}</span>
          </div>
          <div className="card-section">
            <span>Payout: ${payoutAway}</span>
            <span>Payout: ${payoutHome}</span>
          </div>
          <div className="card-section">
            <span>Total Stake: ${totalStake}</span>
            <span>Total Payout: ${totalPayout}</span>
            <span>Profit Percentage: {profitPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageCalculator;
