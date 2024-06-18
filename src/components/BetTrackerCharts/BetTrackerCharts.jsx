// BetTrackerCharts.jsx

import React from 'react';
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateProfitOrLoss } from '../../utils/betCalculator'; 
import './BetTrackerCharts.css';

const BetTrackerCharts = ({ bets }) => {
    // Function to aggregate bets by day and calculate cumulative profit/loss
    const calculateCumulativeProfitLoss = () => {
        const dailyData = {};
        let cumulativeProfit = 0;

        bets.forEach(bet => {
            const betDate = new Date(bet.bet_date).toISOString().split('T')[0]; // Extract date in 'YYYY-MM-DD' format
            const profit = calculateProfitOrLoss(parseFloat(bet.stake), parseFloat(bet.odds), bet.successful_bet);

            if (!dailyData[betDate]) {
                dailyData[betDate] = { date: betDate, dailyProfit: 0 };
            }
            dailyData[betDate].dailyProfit += profit;
        });

        // Convert object to array, sort by date, and calculate cumulative profit
        return Object.values(dailyData)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(dayData => {
                cumulativeProfit += dayData.dailyProfit;
                return {
                    ...dayData,
                    cumulativeProfit: cumulativeProfit
                };
            });
    };

    const cumulativeProfitLossData = calculateCumulativeProfitLoss();

    return (
        <div className="charts-container">
            <div className="profit-over-time-chart">
                <h3>Profit Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={cumulativeProfitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid horizontal={true} vertical={false} stroke="#30475E" opacity={.3}/>
                        <XAxis dataKey="date" stroke="#dddddd" />
                        <YAxis 
                            tickFormatter={(value) => `$${value}`} 
                            domain={['auto', 'auto']} 
                            tickCount={6} 
                            stroke="#dddddd"
                        />
                        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`}/>
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="cumulativeProfit"
                            stroke="#30475E"
                            strokeWidth={4}
                            dot={false}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BetTrackerCharts;
