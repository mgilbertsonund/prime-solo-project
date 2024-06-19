import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBets } from '../../redux/actions/getbets.actions';
import './BetTracker.css';
import Calendar from '../Calendar/Calendar'; // Assuming Calendar component exists
import BetTrackerCharts from '../BetTrackerCharts/BetTrackerCharts'; // Example, replace with your actual line graph component
import BetTrackerTable from '../BetTrackerTable/BetTrackerTable';

const BetTracker = () => {
    const dispatch = useDispatch();
    const bets = useSelector(state => state.bets.bets); // Retrieve 'bets' from Redux store

    useEffect(() => {
        dispatch(fetchBets()); // Fetch bets when the component mounts
    }, [dispatch]);

    return (
        <div className="bet-tracker">
            <h2>Bet Tracker</h2>
            <div className="calendar-section">
                <Calendar bets={bets} />
            </div>
            <div className="line-graph-section">
                <BetTrackerCharts bets={bets} /> 
            </div>
            <div className="table-section">
                <BetTrackerTable bets={bets} />
            </div>
        </div>
    );
};

export default BetTracker;
