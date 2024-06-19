const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET user preferences
router.get('/', (req, res) => {
    const userId = req.user.id;

    const queryText = `
        SELECT b.bookmaker_id, b.bookmaker_name
        FROM user_bookmaker_preferences up
        JOIN bookmakers b ON up.bookmaker_id = b.bookmaker_id
        WHERE up.user_id = $1;
    `;

    pool.query(queryText, [userId])
        .then(result => {
            res.send(result.rows); 
        })
        .catch(err => {
            console.error('Error fetching user preferences:', err.message);
            res.sendStatus(500);
        });
});

// POST user preferences
router.post('/', async (req, res) => {
    const userId = req.user.id;
    const { preferences } = req.body;

    const client = await pool.connect(); // Get a connection from the pool

    try {
        // Fetch the user's current preferences from the database
        const fetchCurrentPreferencesQuery = `
            SELECT bookmaker_id FROM user_bookmaker_preferences WHERE user_id = $1;
        `;
        const currentPreferencesResult = await client.query(fetchCurrentPreferencesQuery, [userId]);
        const currentPreferences = currentPreferencesResult.rows.map(row => row.bookmaker_id);

        // Identify new preferences to add and deselected ones to remove
        const preferencesToAdd = preferences.filter(bookmakerId => !currentPreferences.includes(bookmakerId));
        const preferencesToRemove = currentPreferences.filter(bookmakerId => !preferences.includes(bookmakerId));

        // Start a transaction
        await client.query('BEGIN');

        // Insert new preferences
        for (const bookmakerId of preferencesToAdd) {
            const insertQuery = `
                INSERT INTO user_bookmaker_preferences (user_id, bookmaker_id) VALUES ($1, $2);
            `;
            await client.query(insertQuery, [userId, bookmakerId]);
        }

        // Remove deselected preferences
        for (const bookmakerId of preferencesToRemove) {
            const deleteQuery = `
                DELETE FROM user_bookmaker_preferences WHERE user_id = $1 AND bookmaker_id = $2;
            `;
            await client.query(deleteQuery, [userId, bookmakerId]);
        }

        // Commit transaction
        await client.query('COMMIT');
        res.sendStatus(200);
    } catch (err) {
        console.error('Error updating user preferences:', err.message);
        try {
            await client.query('ROLLBACK'); // Rollback transaction in case of error
        } catch (rollbackError) {
            console.error('Error rolling back transaction:', rollbackError.message);
        }
        res.status(500).send({ message: 'Failed to update user preferences.' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

module.exports = router;
