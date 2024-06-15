const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'User not authenticated' });
};

router.get('/user/bets', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id; // Assuming Passport stores user info here

    try {
        const query = `SELECT * FROM users_bets WHERE user_id = $1 ORDER BY bet_date DESC`;
        const result = await pool.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching bets:', error);
        res.status(500).json({ error: 'Failed to fetch bets' });
    }
});

module.exports = router;
