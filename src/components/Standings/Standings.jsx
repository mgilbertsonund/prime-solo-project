import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Standings.css'; // Ensure you have a CSS file for styling the table

const Standings = () => {
  const [alStandings, setAlStandings] = useState([]);
  const [nlStandings, setNlStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // An object that maps division IDs to their respective division names.
  const divisionNames = {
    201: 'AL East',
    202: 'AL Central',
    203: 'AL West',
    204: 'NL East',
    205: 'NL Central',
    206: 'NL West'
  };

  // Fetches the data from the MLB api endpoint
  // leagueId represents the params for the AL and NL standings endpoints, (i.e., 103 and 104)
  const fetchStandings = async (leagueId) => {
    try {
      const response = await axios.get('https://statsapi.mlb.com/api/v1/standings', {
        params: { leagueId }
      });
      return response.data.records;
    } catch (err) {
      throw err;
    }
  };

  // on mount, call fetchStandings to fetch all the data from each league endpoint and set the data into each array
  useEffect(() => {
    const fetchAllStandings = async () => {
      try {
        const [alData, nlData] = await Promise.all([
          fetchStandings(103), // American League
          fetchStandings(104)  // National League
        ]);
        setAlStandings(alData);
        setNlStandings(nlData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStandings();
  }, []);

  // If loading is true, a loading message is displayed.
  // If there's an error, an error message is displayed.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // A helper function that generates the standings table for each league.
  const renderStandings = (standings) => (
    <div>
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
                  <td>{teamRecord.records.splitRecords.find(record => record.type === 'lastTen').wins}-{teamRecord.records.splitRecords.find(record => record.type === 'lastTen').losses}</td>
                  <td>{teamRecord.streak.streakCode}</td>
                  <td>{teamRecord.runsScored}</td>
                  <td>{teamRecord.runsAllowed}</td>
                  <td>{teamRecord.runDifferential}</td>
                  <td>{teamRecord.records.expectedRecords[0].wins}-{teamRecord.records.expectedRecords[0].losses}</td>
                  <td>{teamRecord.records.splitRecords.find(record => record.type === 'home').wins}-{teamRecord.records.splitRecords.find(record => record.type === 'home').losses}</td>
                  <td>{teamRecord.records.splitRecords.find(record => record.type === 'away').wins}-{teamRecord.records.splitRecords.find(record => record.type === 'away').losses}</td>
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
