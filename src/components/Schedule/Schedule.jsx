import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const Schedule = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowsToShow, setRowsToShow] = useState(20);

  const getDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1); // Add one day to the current date
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months are zero-indexed in JavaScript
    let dd = today.getDate();
    let urlDate = '';

    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (dd < 10) {
      dd = `0${dd}`;
    }

    urlDate = `${yyyy}-${mm}-${dd}`;
    return urlDate;
  };

  useEffect(() => {
    const fetchGames = async () => {
      const startDate = getDate(); // Get the start date which is one day ahead
      try {
        const response = await axios.get('https://statsapi.mlb.com/api/v1/schedule/games/', {
          params: {
            sportId: 1,
            startDate: startDate,
            endDate: '2024-09-29'
          }
        });
        setGames(response.data.dates.flatMap(date => date.games));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const formatTime = (dateString) => {
    return moment(dateString).tz('America/Chicago').format('YYYY-MM-DD hh:mm A');
  };

  const loadMoreGames = () => {
    setRowsToShow(rowsToShow + 20);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>MLB Games</h2>
      <table className="schedule">
        <thead>
          <tr>
            <th>Matchup</th>
            <th>Date</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {games.slice(0, rowsToShow).map(game => (
            <tr key={game.gamePk}>
              <td>{game.teams.away.team.name} ({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}) 
                  vs. {game.teams.home.team.name} ({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses}) </td>
              <td>{formatTime(game.gameDate)}</td>
              <td>{game.venue.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rowsToShow < games.length && (
        <button onClick={loadMoreGames}>Load More</button>
      )}
    </div>
  );
};

export default Schedule;

