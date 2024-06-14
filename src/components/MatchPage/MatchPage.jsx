import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { arbitrageCalculator, processOddsData } from '../../utils/matchPageCalculations';
import ArbitrageCalculator from '../ArbitrageCalculator/ArbitrageCalculator';
import MatchPageForm from '../MatchPageForm/MatchPageForm';
import './MatchPage.css'; 

const MatchPage = () => {
  const { matchId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { odds, loading, error } = useSelector(store => store.odds);
  const user = useSelector(store => store.user);

  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    if (!user.id) {
      history.push('/login');
    } else if (!odds || odds.length === 0) {
      dispatch(fetchOddsRequest());
    }
  }, [dispatch, odds, user, history]);

  const selectedGame = useMemo(() => odds.find(game => game.id === matchId), [odds, matchId]);

  const processedOdds = useMemo(() => {
    if (!selectedGame) return {};
    return processOddsData(selectedGame);
  }, [selectedGame]);

  const handleCellClick = (market, bookmaker, oddsPrice) => {
    setSelectedMarket({ market, bookmaker, oddsPrice, stake: 100 });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedGame) return <p>No game found.</p>;

  const { bookmakersData, bestAwayOdds, bestHomeOdds, bestAwayBookmaker, bestHomeBookmaker } = processedOdds;
  const arbitrageCalculatorVariables = processedOdds ? arbitrageCalculator({ bestAwayOdds, bestHomeOdds }) : null;

  return (
    <div className="match-container">
      <h2>{selectedGame.away_team} vs. {selectedGame.home_team}</h2>
      <h3>Bookmaker Odds</h3>
      <div className="scroll-container">
        <table className="scroll-table">
          <thead>
            <tr>
              <th></th>
              <th>Best Odds</th>
              {bookmakersData.map(bookmaker => (
                <th key={bookmaker.key}>{bookmaker.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{selectedGame.away_team}</th>
              <td>{bestAwayOdds} ({bestAwayBookmaker})</td>
              {bookmakersData.map(bookmaker => (
                <td
                  key={`${bookmaker.key}-away`}
                  className={bookmaker.isBetterAway ? 'better-odds' : ''}
                  onClick={() => handleCellClick(`${selectedGame.away_team} Moneyline`, bookmaker.title, bookmaker.awayPrice)}
                >
                  {bookmaker.awayPrice || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <th>{selectedGame.home_team}</th>
              <td>{bestHomeOdds} ({bestHomeBookmaker})</td>
              {bookmakersData.map(bookmaker => (
                <td
                  key={`${bookmaker.key}-home`}
                  className={bookmaker.isBetterHome ? 'better-odds' : ''}
                  onClick={() => handleCellClick(`${selectedGame.home_team} Moneyline`, bookmaker.title, bookmaker.homePrice)}
                >
                  {bookmaker.homePrice || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <ArbitrageCalculator
        awayTeam={selectedGame.away_team}
        homeTeam={selectedGame.home_team}
        bestAwayOdds={bestAwayOdds}
        bestHomeOdds={bestHomeOdds}
        bestAwayBookmaker={bestAwayBookmaker}
        bestHomeBookmaker={bestHomeBookmaker}
        arbitrageCalculatorVariables={arbitrageCalculatorVariables}
      />
      {selectedMarket && (
        <MatchPageForm
          userId={user.id} // Pass the user ID to the form
          selectedMarket={selectedMarket}
          onCancel={() => setSelectedMarket(null)}
        />
      )}
    </div>
  );
};

export default MatchPage;
