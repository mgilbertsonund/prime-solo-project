const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET user preferences
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const queryText = `SELECT bookmaker_id FROM user_bookmaker_preferences WHERE user_id = $1;`;
    pool.query(queryText, [userId])
        .then(result => res.send(result.rows.map(row => row.bookmaker_id)))
        .catch(err => {
            console.error('Error fetching user preferences', err);
            res.sendStatus(500);
        });
});

// POST user preferences
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;
    const { preferences } = req.body;

    // Start a transaction
    pool.query('BEGIN')
        .then(() => {
            // Delete existing preferences for the user
            const deleteQuery = `DELETE FROM user_bookmaker_preferences WHERE user_id = $1;`;
            return pool.query(deleteQuery, [userId]);
        })
        .then(() => {
            // Insert new preferences
            const insertPromises = preferences.map(bookmakerId => {
                const insertQuery = `INSERT INTO user_bookmaker_preferences (user_id, bookmaker_id) VALUES ($1, $2);`;
                return pool.query(insertQuery, [userId, bookmakerId]);
            });
            return Promise.all(insertPromises);
        })
        .then(() => pool.query('COMMIT')) // Commit transaction
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.error('Error updating user preferences', err);
            pool.query('ROLLBACK'); // Rollback transaction in case of error
            res.sendStatus(500);
        });
});

module.exports = router;
