import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScheduleRequest } from '../../redux/actions/schedule.actions';

const Schedule = () => {
  const [rowsToShow, setRowsToShow] = useState(20);
  const dispatch = useDispatch();
  const { schedule, loading, error } = useSelector(state => state.schedule);

  useEffect(() => {
    dispatch(fetchScheduleRequest());
  }, [dispatch]);

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
          {schedule.slice(0, rowsToShow).map(game => (
            <tr key={game.gamePk}>
              <td>{game.teams.away.team.name} ({game.teams.away.leagueRecord.wins}-{game.teams.away.leagueRecord.losses}) 
                  vs. {game.teams.home.team.name} ({game.teams.home.leagueRecord.wins}-{game.teams.home.leagueRecord.losses}) </td>
              <td>{formatTime(game.gameDate)}</td>
              <td>{game.venue.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rowsToShow < schedule.length && (
        <button onClick={loadMoreGames}>Load More</button>
      )}
    </div>
  );
};

export default Schedule;

