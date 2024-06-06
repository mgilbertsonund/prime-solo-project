import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStandingsRequest } from '../../redux/actions/standings.actions';

const divisionNames = {
    200: 'AL West',
    201: 'AL East',
    202: 'AL Central',
    203: 'NL West',
    204: 'NL East',
    205: 'NL Central',
};

const Standings = () => {
  const dispatch = useDispatch();
  const { alStandings, nlStandings, loading, error } = useSelector(store => store.standings);


  useEffect(() => {
    dispatch(fetchStandingsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderStandings = (standings, leagueName) => (
    <div>
      <h2>{leagueName} Standings</h2>
      {standings.map(record => (
        <div key={record.division.id}>
          <h3>{divisionNames[record.division.id]}</h3>
          <table className="standings">
            <thead>
              <tr>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win Percentage</th>
                <th>GB</th>
                <th>WCGB</th>
                <th>L10</th>
                <th>Streak</th>
                <th>Runs Scored</th>
                <th>Runs Against</th>
                <th>Run Differential</th>
                <th>Expected Win/Loss</th>
                <th>Home Record</th>
                <th>Away Record</th>
              </tr>
            </thead>
            <tbody>
              {record.teamRecords.map(teamRecord => (
                <tr key={teamRecord.team.id}>
                  <td>{teamRecord.team.name}</td>
                  <td>{teamRecord.wins}</td>
                  <td>{teamRecord.losses}</td>
                  <td>{(teamRecord.winningPercentage * 100).toFixed(1)}%</td>
                  <td>{teamRecord.gamesBack}</td>
                  <td>{teamRecord.wildCardGamesBack}</td>
                  <td>{teamRecord.records?.splitRecords?.find(record => record.type === 'lastTen')?.wins || 0}-{teamRecord.records?.splitRecords?.find(record => record.type === 'lastTen')?.losses || 0}</td>
                  <td>{teamRecord.streak?.streakCode || ''}</td>
                  <td>{teamRecord.runsScored}</td>
                  <td>{teamRecord.runsAllowed}</td>
                  <td>{teamRecord.runDifferential}</td>
                  <td>{teamRecord.records?.expectedRecords?.[0]?.wins || 0}-{teamRecord.records?.expectedRecords?.[0]?.losses || 0}</td>
                  <td>{teamRecord.records?.splitRecords?.find(record => record.type === 'home')?.wins || 0}-{teamRecord.records?.splitRecords?.find(record => record.type === 'home')?.losses || 0}</td>
                  <td>{teamRecord.records?.splitRecords?.find(record => record.type === 'away')?.wins || 0}-{teamRecord.records?.splitRecords?.find(record => record.type === 'away')?.losses || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {renderStandings(alStandings, 'American League')}
      {renderStandings(nlStandings, 'National League')}
    </div>
  );
};

export default Standings;
