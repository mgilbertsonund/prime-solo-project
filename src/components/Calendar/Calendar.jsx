import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ProfitLossCalendar = ({ bets }) => {
    // Example function to summarize bets by day
    const summarizeBetsByDay = (bets) => {
        return bets.reduce((acc, bet) => {
            const date = new Date(bet.bet_date).toDateString();
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += bet.successful_bet ? bet.stake : -bet.stake; // Simplified profit/loss logic
            return acc;
        }, {});
    };

    const dailySummary = summarizeBetsByDay(bets);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toDateString();
            if (dailySummary[dateStr] !== undefined) {
                return <p>{dailySummary[dateStr]}</p>;
            }
        }
    };

    return (
        <div>
            <h2>Daily Profit/Loss Calendar</h2>
            <Calendar tileContent={tileContent} />
        </div>
    );
};

export default ProfitLossCalendar;
