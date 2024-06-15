import React from 'react';

const BetsTable = ({ bets }) => {
    return (
        <div>
            <h2>All Bets</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Market</th>
                        <th>Bookmaker</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Arbitrage</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {bets.map(bet => (
                        <tr key={bet.bet_id}>
                            <td>{new Date(bet.bet_date).toLocaleDateString()}</td>
                            <td>{bet.market}</td>
                            <td>{bet.bookmaker_id}</td> {/* Replace with actual name if needed */}
                            <td>{bet.odds}</td>
                            <td>{bet.stake}</td>
                            <td>{bet.is_arbitrage ? 'Yes' : 'No'}</td>
                            <td>{bet.successful_bet ? 'Win' : 'Loss'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BetsTable;
1