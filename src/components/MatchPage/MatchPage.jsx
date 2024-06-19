import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchOddsRequest } from '../../redux/actions/odds.actions';
import { fetchUserPreferences } from '../../redux/actions/userPreferences.actions';
import { arbitrageCalculator, processOddsData } from '../../utils/matchPageCalculations';
import ArbitrageCalculator from '../ArbitrageCalculator/ArbitrageCalculator';
import MatchPageForm from '../MatchPageForm/MatchPageForm';
import './MatchPage.css';

const MatchPage = () => {
  const { matchId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { odds, loading: oddsLoading, error: oddsError } = useSelector(store => store.odds);
  const { preferences, loading: prefsLoading, error: prefsError } = useSelector(store => store.userPreferences);
  const user = useSelector(store => store.user);

  const [selectedMarket, setSelectedMarket] = useState(null);
  const [filteredGame, setFilteredGame] = useState(null);

  useEffect(() => {
    if (!user.id) {
      history.push('/login');
    } else {
      // Fetch user preferences and odds
      dispatch(fetchUserPreferences());
      if (!odds || odds.length === 0) {
        dispatch(fetchOddsRequest());
      }
    }
  }, [dispatch, odds, user, history]);

  useEffect(() => {
    if (odds && preferences.length > 0) {
      const selectedGame = odds.find(game => game.id === matchId);
      if (selectedGame) {
        const filteredBookmakers = selectedGame.bookmakers.filter(bookmaker =>
          preferences.some(pref => pref.bookmaker_name === bookmaker.title)
        );
        setFilteredGame({ ...selectedGame, bookmakers: filteredBookmakers });
      }
    }
  }, [odds, preferences, matchId]);

  const processedOdds = useMemo(() => {
    if (!filteredGame) return {};
    return processOddsData(filteredGame);
  }, [filteredGame]);

  const handleCellClick = (market, bookmaker, oddsPrice) => {
    setSelectedMarket({ market, bookmaker, oddsPrice, stake: 100 });
  };

  if (oddsLoading || prefsLoading) return <p>Loading...</p>;
  if (oddsError) return <p>Error loading odds: {oddsError}</p>;
  if (prefsError) return <p>Error loading preferences: {prefsError}</p>;
  if (!filteredGame) return <p>No game found or no bookmakers matched your preferences.</p>;

  const { bookmakersData, bestAwayOdds, bestHomeOdds, bestAwayBookmaker, bestHomeBookmaker } = processedOdds;
  const arbitrageCalculatorVariables = processedOdds ? arbitrageCalculator({ bestAwayOdds, bestHomeOdds }) : null;

  return (
    <div className="match-container">
      <h2>{filteredGame.away_team} vs. {filteredGame.home_team}</h2>
      <h3>Bookmaker Odds</h3>
      <div className="scroll-container">
        <table className="scroll-table">
          <thead>
            <tr>
              <th></th>
              <th>Best Odds</th>
              {bookmakersData && bookmakersData.map(bookmaker => (
                <th key={bookmaker.key}>{bookmaker.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{filteredGame.away_team}</th>
              <td>{bestAwayOdds} ({bestAwayBookmaker})</td>
              {bookmakersData && bookmakersData.map(bookmaker => (
                <td
                  key={`${bookmaker.key}-away`}
                  className={bookmaker.isBetterAway ? 'better-odds' : ''}
                  onClick={() => handleCellClick(`${filteredGame.away_team} Moneyline`, bookmaker.title, bookmaker.awayPrice)}
                >
                  {bookmaker.awayPrice || 'N/A'}
                </td>
              ))}
            </tr>
            <tr>
              <th>{filteredGame.home_team}</th>
              <td>{bestHomeOdds} ({bestHomeBookmaker})</td>
              {bookmakersData && bookmakersData.map(bookmaker => (
                <td
                  key={`${bookmaker.key}-home`}
                  className={bookmaker.isBetterHome ? 'better-odds' : ''}
                  onClick={() => handleCellClick(`${filteredGame.home_team} Moneyline`, bookmaker.title, bookmaker.homePrice)}
                >
                  {bookmaker.homePrice || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <ArbitrageCalculator
        awayTeam={filteredGame.away_team}
        homeTeam={filteredGame.home_team}
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
