import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './MatchPageForm.css'; 
import { saveBetRequest } from '../../redux/actions/savebet.actions';

const MatchPageForm = ({ userId, selectedMarket, onCancel }) => {
    const [stake, setStake] = useState(selectedMarket.stake || 0);
    const [isArbitrage, setIsArbitrage] = useState(false);
    const [bookmakers, setBookmakers] = useState([]);
    const dispatch = useDispatch();
    console.log(selectedMarket);

    // Fetch bookmakers data from API
    useEffect(() => {
        const fetchBookmakers = async () => {
            try {
                const response = await fetch('/api/bookmakers'); // Adjust endpoint as per your API
                const data = await response.json();
                setBookmakers(data); // Assuming data is an array of bookmakers
            } catch (error) {
                console.error('Error fetching bookmakers:', error);
            }
        };

        fetchBookmakers();
    }, []);

    const handleSave = () => {
        // Find the selected bookmaker_id based on selectedMarket.bookmaker
        const selectedBookmaker = bookmakers.find(bookmaker => bookmaker.name === selectedMarket.bookmaker);
        
        if (!selectedBookmaker) {
            console.error(`Bookmaker ${selectedMarket.bookmaker} not found in bookmakers list.`);
            return;
        }

        const betData = {
            user_id: userId,
            market: selectedMarket.market,
            bookmaker_id: selectedBookmaker.id, // Use the fetched bookmaker_id
            odds: selectedMarket.oddsPrice,
            stake: parseFloat(stake),
            isArbitrage: isArbitrage,
            bet_date: new Date().toISOString(),
            successful_bet: false,
        };

        dispatch(saveBetRequest(betData));
        onCancel();
    };

    return (
        <div className='bet-form-overlay'>
            <div className='bet-form-container'>
                <h3>Add to Bet Tracker</h3>
                <form>
                    <div>
                        <label>Market:</label>
                        <span>{selectedMarket.market}</span>
                    </div>
                    <div>
                        <label>Bookmaker:</label>
                        <span>{selectedMarket.bookmaker}</span>
                    </div>
                    <div>
                        <label>Odds:</label>
                        <span>{selectedMarket.oddsPrice}</span>
                    </div>
                    <div>
                        <label>Stake:</label>
                        <input
                            type="number"
                            value={stake}
                            onChange={(e) => setStake(e.target.value)}
                        />
                    </div>
                    <div className='arbitrage-checkbox-container'>
                        <label className='arbitrage-checkbox-label'>Arbitrage Bet:</label>
                        <input
                            type="checkbox"
                            className='arbitrage-checkbox'
                            checked={isArbitrage}
                            onChange={(e) => setIsArbitrage(e.target.checked)}
                        />
                    </div>
                    <div className='bet-form-buttons'>
                        <button type='button' onClick={onCancel}>Cancel</button>
                        <button type='button' onClick={handleSave}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MatchPageForm;
