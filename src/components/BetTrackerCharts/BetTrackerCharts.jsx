import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitLossChart = ({ bets }) => {
    // Process bets to create data points for the chart
    const processBetsForChart = (bets) => {
        let cumulativeProfit = 0;
        return bets.map(bet => {
            cumulativeProfit += bet.successful_bet ? bet.stake : -bet.stake; // Simplified profit/loss logic
            return {
                date: new Date(bet.bet_date).toLocaleDateString(),
                profit: cumulativeProfit,
            };
        });
    };

    const chartData = processBetsForChart(bets);

    return (
        <div>
            <h2>Profit/Loss Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProfitLossChart;
