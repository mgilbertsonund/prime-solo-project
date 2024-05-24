import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; 
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
      const startDate = getDate();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>MLB Games</h2>
      <ul>
        {games.map(game => (
          <li key={game.gamePk}>
            <p>{game.teams.away.team.name} vs. {game.teams.home.team.name}</p>
            <p>Date: {game.officialDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;

