import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './BetTracker.css';
import ProfitLossCalendar from '../Calendar/Calendar';
import ProfitLossChart from '../BetTrackerCharts/BetTrackerCharts';
import BetsTable from '../BetTrackerTable/BetTrackerTable';

const BetTracker = () => {
    const [bets, setBets] = useState([]);
    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        const getBets = async () => {
            try {
                const response = await fetch('/api/bets/user/bets', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT, add it here
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                setBets(data);
            } catch (error) {
                console.error('Error fetching bets:', error);
            }
        };

        getBets(); // Fetch bets when the component mounts
    }, [userId]);

    return (
        <div className="bet-tracker">
            <h1>Bet Tracker</h1>
            <div className="calendar-section">
                <ProfitLossCalendar bets={bets} />
            </div>
            <div className="chart-section">
                <ProfitLossChart bets={bets} />
            </div>
            <div className="table-section">
                <BetsTable bets={bets} />
            </div>
        </div>
    );
};

export default BetTracker;
