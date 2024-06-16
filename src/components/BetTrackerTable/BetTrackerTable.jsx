import React from 'react';

const BetTrackerTable = ({ bets }) => {
    if (!bets || bets.length === 0) {
        return <div>Loading...</div>; // Placeholder for loading state or handle empty case
    }

    return (
        <div className="table-container">
            <h3>Bet History</h3>
            <table className="bets-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Market</th>
                        <th>Bookmaker</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {bets.map((bet, index) => (
                        <tr key={index}>
                            <td>{new Date(bet.bet_date).toLocaleDateString()}</td>
                            <td>{bet.market}</td>
                            <td>{bet.bookmaker_id}</td>
                            <td>{bet.odds}</td>
                            <td>${bet.stake}</td>
                            <td>${bet.successful_bet ? (parseFloat(bet.stake) * bet.odds - parseFloat(bet.stake)).toFixed(2) : (-parseFloat(bet.stake)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BetTrackerTable;
