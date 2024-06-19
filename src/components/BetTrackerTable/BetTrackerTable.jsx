import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBet } from '../../redux/actions/deletebet.actions'; // Adjust the path as needed
import { calculateProfitOrLoss } from '../../utils/betCalculator'; 
import './BetTrackerTable.css';

const BetTrackerTable = ({ bets }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const dispatch = useDispatch();

    // Pagination logic
    const indexOfLastBet = (currentPage + 1) * itemsPerPage;
    const indexOfFirstBet = currentPage * itemsPerPage;
    const currentBets = bets.slice(indexOfFirstBet, indexOfLastBet);
    const totalPages = Math.ceil(bets.length / itemsPerPage);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Delete bet handler
    const handleDelete = (betId) => {
        dispatch(deleteBet(betId));
    };

    return (
        <div className="table-container">
            <h3 className='header'>Bet History</h3>
            <table className="bets-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Market</th>
                        <th>Bookmaker</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Profit/Loss</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBets.map((bet, index) => {
                        const profitLoss = calculateProfitOrLoss(parseFloat(bet.stake), parseFloat(bet.odds), bet.successful_bet);
                        const profitLossColor = profitLoss >= 0 ? '#4caf50' : '#f05454';

                        return (
                            <tr key={index}>
                                <td>{new Date(bet.bet_date).toLocaleDateString()}</td>
                                <td>{bet.market}</td>
                                <td>{bet.bookmaker_id}</td>
                                <td>{bet.odds}</td>
                                <td>${bet.stake}</td>
                                <td style={{ color: profitLossColor }}>
                                    ${profitLoss.toFixed(2)}
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(bet.bet_id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BetTrackerTable;
