// BetTrackerCharts.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BetTrackerCharts = ({ bets }) => {

    const calculateTotalProfit = () => {
        return bets.reduce((total, bet) => {
            if (bet.successful_bet) {
                return total + (parseFloat(bet.stake) * bet.odds - parseFloat(bet.stake));
            } else {
                return total - parseFloat(bet.stake);
            }
        }, 0);
    };

    const calculateProfitOverTime = () => {
        const monthlyData = [];
        const currentDate = new Date();
        let totalProfit = 0;

        for (let month = 0; month < 6; month++) {
            totalProfit += Math.random() * 1000 - 500; // Dummy data for demonstration
            monthlyData.push({
                month: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
                profit: totalProfit.toFixed(2)
            });
            currentDate.setMonth(currentDate.getMonth() - 1);
        }

        return monthlyData.reverse();
    };

    const monthlyProfitData = calculateProfitOverTime();

    return (
        <div className="charts-container">
            {/* <h3>Total Profit: ${calculateTotalProfit().toFixed(2)}</h3> */}
            <div className="profit-over-time-chart">
                <h3>Profit Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyProfitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BetTrackerCharts;
