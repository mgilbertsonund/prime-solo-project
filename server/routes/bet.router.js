const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'User not authenticated' });
};

router.post('/', async (req, res) => {
    const { user_id, market, bookmaker_id, odds, stake, isArbitrage, bet_date, successful_bet } = req.body;

    console.log("Received POST request with data:", req.body);

    try {
        const query = `
            INSERT INTO users_bets (user_id, market, bookmaker_id, odds, stake, is_arbitrage, bet_date, successful_bet)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [user_id, market, bookmaker_id, odds, stake, isArbitrage, bet_date, successful_bet];

        const result = await pool.query(query, values);

        console.log("Insert result:", result.rows[0]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting bet into database:", error);
        res.status(500).json({ error: 'Failed to save bet' });
    }
});

router.get('/user', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id; 

    try {
        const query = `
            SELECT 
                ub.*,
                bm.bookmaker_name
            FROM users_bets ub
            JOIN bookmakers bm ON ub.bookmaker_id = bm.bookmaker_id
            WHERE ub.user_id = $1
            ORDER BY ub.bet_date DESC
        `;
        const result = await pool.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching bets:', error);
        res.status(500).json({ error: 'Failed to fetch bets' });
    }
});

router.delete('/user/:id', ensureAuthenticated, async (req, res) => {
    const betId = req.params.id;
    const userId = req.user.id; 

    try {
        const query = `DELETE FROM users_bets WHERE bet_id = $1 AND user_id = $2 RETURNING *`;
        const result = await pool.query(query, [betId, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Bet not found or not authorized to delete' });
        }

        res.status(200).json({ message: 'Bet deleted successfully', bet: result.rows[0] });
    } catch (error) {
        console.error('Error deleting bet:', error);
        res.status(500).json({ error: 'Failed to delete bet' });
    }
});


module.exports = router;
