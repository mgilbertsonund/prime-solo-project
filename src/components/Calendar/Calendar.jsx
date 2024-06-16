import React, { useState } from 'react';
import './Calendar.css';
import { calculateProfitOrLoss } from '../../utils/betCalculator'; 

const Calendar = ({ bets }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    if (!bets || bets.length === 0) {
        return <div>Loading...</div>; // Placeholder for loading state or handle empty case
    }

    // Function to get bet information including calculated profit or loss
    const getBetInfo = (date) => {
        const bet = bets.find(bet => bet.bet_date.includes(date));
        if (bet) {
            const profitOrLoss = calculateProfitOrLoss(bet.stake, bet.odds, bet.successful_bet);
            return {
                profitable: bet.successful_bet,
                amount: profitOrLoss
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
            const betInfo = getBetInfo(dateString);

            monthData.push({
                date: dateString,
                day: day,
                ...betInfo // Include profitability and amount if they exist
            });
        }

        return monthData;
    };

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
                                {dayData.profitable ? '+' : '-'}${Math.abs(dayData.amount.toFixed(2))}
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
    );
};

export default Calendar;
