import React, { useState } from 'react';
import './Calendar.css';
import { calculateProfitOrLoss } from '../../utils/betCalculator';

const Calendar = ({ bets }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    if (!bets || bets.length === 0) {
        return <div>Loading...</div>; // Placeholder for loading state or handle empty case
    }

    // Function to get cumulative profit or loss for all bets on a specific date
    const getDailyProfitOrLoss = (date) => {
        const dailyBets = bets.filter(bet => bet.bet_date.includes(date));
        if (dailyBets.length > 0) {
            let totalProfitOrLoss = 0;

            dailyBets.forEach(bet => {
                const profitOrLoss = calculateProfitOrLoss(bet.stake, bet.odds, bet.successful_bet);
                totalProfitOrLoss += profitOrLoss;
            });

            // Determine profitability status based on total profit or loss
            const profitable = totalProfitOrLoss > 0;

            return {
                profitable,
                amount: totalProfitOrLoss
            };
        }
        return undefined; // Return undefined for days with no betting
    };

    // Function to get the number of days in the current month
    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Function to get the data for the current month
    const getMonthData = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysCount = daysInMonth(date);
        const monthData = [];

        for (let day = 1; day <= daysCount; day++) {
            const currentDate = new Date(year, month, day);
            const dateString = currentDate.toISOString().split('T')[0];
            const dailyInfo = getDailyProfitOrLoss(dateString);

            monthData.push({
                date: dateString,
                day: day,
                ...dailyInfo // Include profitability and amount if they exist
            });
        }

        return monthData;
    };

    // Function to calculate the total profit
    const calculateTotalProfit = () => {
        return bets.reduce((total, bet) => {
            const profitOrLoss = calculateProfitOrLoss(bet.stake, bet.odds, bet.successful_bet);
            return total + profitOrLoss;
        }, 0);
    };

    // Function to calculate the profit for the current month
    const calculateMonthlyProfit = () => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return bets.reduce((total, bet) => {
            const betDate = new Date(bet.bet_date);
            if (betDate.getMonth() === currentMonth && betDate.getFullYear() === currentYear) {
                const profitOrLoss = calculateProfitOrLoss(bet.stake, bet.odds, bet.successful_bet);
                return total + profitOrLoss;
            }
            return total;
        }, 0);
    };

    // Calculate the profits
    const totalProfit = calculateTotalProfit().toFixed(2);
    const monthlyProfit = calculateMonthlyProfit().toFixed(2);

    // Function to render the calendar grid
    const renderCalendar = () => {
        const monthData = getMonthData(currentDate);

        return (
            <div className="calendar-grid">
                {monthData.map((dayData, index) => (
                    <div
                        key={index}
                        className={`calendar-cell ${dayData.profitable ? 'profitable' : dayData.profitable === false ? 'loss' : ''}`}
                    >
                        <div className="day-number">{dayData.day}</div>
                        {dayData.amount !== undefined && (
                            <div className="bet-amount">
                                {dayData.amount >= 0 ? '+' : '-'}${Math.abs(dayData.amount).toFixed(2)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    // Function to move to the previous month
    const moveToPreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    // Function to move to the next month
    const moveToNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    return (
        <div className="calendar-content">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={moveToPreviousMonth}>Previous</button>
                    <div className="calendar-month-year">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <button onClick={moveToNextMonth}>Next</button>
                </div>
                {renderCalendar()}
            </div>
            <div className="profit-summary-container">
                <div className="profit-summary-box">
                    <h4>Total Profit</h4>
                    <p>${totalProfit}</p>
                </div>
                <div className="profit-summary-box">
                    <h4>Monthly Profit</h4>
                    <p>${monthlyProfit}</p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
