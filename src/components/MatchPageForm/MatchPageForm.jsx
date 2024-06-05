import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './MatchPageForm.css';

const MatchPageForm = ({ selectedMarket, onCancel }) => {
    const [stake, setStake] = useState(selectedMarket.stake);
    const dispatch = useDispatch();
    
    const handleSave = () => {
        const betData = {
            market: selectedMarket.market,
            bookmaker: selectedMarket.bookmaker,
            odds: selectedMarket.odds,
            stake: parseInt(stake, 10),
        };

        dispatch({ type: 'SAVE_BET', payload: betData });
        onCancel();
    }
    
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
                        <span>{selectedMarket.odds}</span>
                    </div>
                    <div>
                        <label>Stake:</label>
                        <input
                            type="number"
                            value={stake}
                            onChange={(e) => setStake(e.target.value)}
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