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
  
    const awayPrices = bookmakersData.map(b => b.awayPrice).filter(price => price !== undefined);
    const homePrices = bookmakersData.map(b => b.homePrice).filter(price => price !== undefined);
  
    const averageAwayOdds = (awayPrices.reduce((acc, price) => acc + price, 0) / awayPrices.length).toFixed(0);
    const averageHomeOdds = (homePrices.reduce((acc, price) => acc + price, 0) / homePrices.length).toFixed(0);
  
    return {
      bookmakersData,
      bestAwayOdds,
      bestHomeOdds,
      bestAwayBookmaker,
      bestHomeBookmaker,
      averageAwayOdds,
      averageHomeOdds
    };
  };
  