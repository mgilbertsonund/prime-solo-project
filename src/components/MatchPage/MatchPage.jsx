import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MatchPage = () => {
  const { matchId } = useParams();
  const { odds } = useSelector(store => store.odds);

  const selectedGame = odds.find(game => game.id === matchId);
  console.log('selectedGame', selectedGame);

  return (
    <div>
      {/* Display selected game details here */}
      {selectedGame.away_team}
      {selectedGame.home_team}
    </div>
  );
};

export default MatchPage;