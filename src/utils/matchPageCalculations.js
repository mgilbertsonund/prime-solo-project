import { americanToProbability, probabilityToAmerican } from './oddsCalculations';

// Function to determine if the odds are better than Pinnacle's odds
export const isBetterOdds = (price, pinnaclePrice) => {
  if (pinnaclePrice >= 0) {
    return price > pinnaclePrice; // For positive odds, higher is better
  }
  return price > pinnaclePrice; // For negative odds, closer to zero is better
};

// Function to process odds data and calculate best and average odds
export const processOddsData = (selectedGame) => {
  const pinnacle = selectedGame.bookmakers.find(bookmaker => bookmaker.key === 'pinnacle');
  const pinnacleAwayOdds = pinnacle?.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.away_team)?.price;
  const pinnacleHomeOdds = pinnacle?.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.home_team)?.price;

  let bestAwayOdds = -Infinity;
  let bestHomeOdds = -Infinity;
  let bestAwayBookmaker = '';
  let bestHomeBookmaker = '';

  const bookmakersData = selectedGame.bookmakers.map(bookmaker => {
    const awayOutcome = bookmaker.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.away_team);
    const homeOutcome = bookmaker.markets[0]?.outcomes.find(outcome => outcome.name === selectedGame.home_team);
    const awayPrice = awayOutcome?.price;
    const homePrice = homeOutcome?.price;

    if (awayPrice !== undefined && awayPrice > bestAwayOdds) {
      bestAwayOdds = awayPrice;
      bestAwayBookmaker = bookmaker.title;
    }

    if (homePrice !== undefined && homePrice > bestHomeOdds) {
      bestHomeOdds = homePrice;
      bestHomeBookmaker = bookmaker.title;
    }

    const isBetterAway = bookmaker.key !== 'pinnacle' && awayPrice !== undefined && isBetterOdds(awayPrice, pinnacleAwayOdds);
    const isBetterHome = bookmaker.key !== 'pinnacle' && homePrice !== undefined && isBetterOdds(homePrice, pinnacleHomeOdds);

    return {
      key: bookmaker.key,
      title: bookmaker.title,
      awayPrice,
      homePrice,
      isBetterAway,
      isBetterHome
    };
  });

  return {
    bookmakersData,
    bestAwayOdds,
    bestHomeOdds,
    bestAwayBookmaker,
    bestHomeBookmaker,
  };
};

// Function to help calculate variables in arbitrage calculator
export const arbitrageCalculator = ({ bestAwayOdds, bestHomeOdds }) => {
  console.log('Calculating arbitrage...');
  console.log('bestAwayOdds:', bestAwayOdds);
  console.log('bestHomeOdds:', bestHomeOdds);

  // Convert American odds to implied probabilities
  const impliedProbAway = americanToProbability(bestAwayOdds);
  const impliedProbHome = americanToProbability(bestHomeOdds);

  console.log('impliedProbAway:', impliedProbAway);
  console.log('impliedProbHome:', impliedProbHome);

  // Calculate total implied probability
  const totalImpliedProb = impliedProbAway + impliedProbHome;

  console.log('totalImpliedProb:', totalImpliedProb);

  // Check if there is an arbitrage opportunity
  const hasArbitrageOpportunity = totalImpliedProb < 1;

  // Assume a total stake of 100 units (for example)
  const totalStake = 100;

  // Calculate stakes for each bet
  const stakeAway = (totalStake * impliedProbAway) / totalImpliedProb;
  const stakeHome = (totalStake * impliedProbHome) / totalImpliedProb;

  console.log('stakeAway:', stakeAway);
  console.log('stakeHome:', stakeHome);

  // Calculate payouts
  const payoutAway = stakeAway * (bestAwayOdds > 0 ? (bestAwayOdds / 100) + 1 : 1 - (100 / bestAwayOdds));
  const payoutHome = stakeHome * (bestHomeOdds > 0 ? (bestHomeOdds / 100) + 1 : 1 - (100 / bestHomeOdds));

  console.log('payoutAway:', payoutAway);
  console.log('payoutHome:', payoutHome);

  // Calculate total payout and profit
  const totalPayout = Math.min(payoutAway, payoutHome);
  const profit = totalPayout - totalStake;
  const profitPercentage = (profit / totalStake) * 100;

  console.log('Arbitrage calculations:', {
    stakeAway: stakeAway.toFixed(2),
    stakeHome: stakeHome.toFixed(2),
    payoutAway: payoutAway.toFixed(2),
    payoutHome: payoutHome.toFixed(2),
    totalStake: totalStake.toFixed(2),
    totalPayout: totalPayout.toFixed(2),
    profitPercentage: profitPercentage.toFixed(2),
    hasArbitrageOpportunity
  });

  return {
    stakeAway: stakeAway.toFixed(2),
    stakeHome: stakeHome.toFixed(2),
    payoutAway: payoutAway.toFixed(2),
    payoutHome: payoutHome.toFixed(2),
    totalStake: totalStake.toFixed(2),
    totalPayout: totalPayout.toFixed(2),
    profitPercentage: profitPercentage.toFixed(2),
    hasArbitrageOpportunity
  };
};
