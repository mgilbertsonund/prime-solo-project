export const americanToProbability = (odds) => {
    return odds > 0 ? 100 / (odds + 100) : -odds / (-odds + 100);
  };
  
  export const probabilityToAmerican = (prob) => {
    return prob >= 0.5 ? -100 * (prob / (1 - prob)) : 100 * ((1 - prob) / prob);
  };
  
  export const calculateAverageAmericanOdds = (bookmakers, teamName) => {
    const probabilities = [];
    bookmakers.forEach((bookmaker) => {
      const market = bookmaker.markets.find(m => m.key === 'h2h');
      if (market) {
        const outcome = market.outcomes.find(o => o.name === teamName);
        if (outcome) {
          probabilities.push(americanToProbability(outcome.price));
        }
      }
    });
    if (probabilities.length === 0) return null;
    const averageProbability = probabilities.reduce((acc, prob) => acc + prob, 0) / probabilities.length;
    const averageOdds = probabilityToAmerican(averageProbability);
    return averageOdds.toFixed(0);
  };
  