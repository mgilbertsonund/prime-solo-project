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
router.post('/', (req, res) => {
    const userId = req.user.id; 
    const { preferences } = req.body;

    // Fetch the user's current preferences from the database
    const fetchCurrentPreferencesQuery = `SELECT bookmaker_id FROM user_bookmaker_preferences WHERE user_id = $1;`;
    pool.query(fetchCurrentPreferencesQuery, [userId])
        .then((currentPreferencesResult) => {
            const currentPreferences = currentPreferencesResult.rows.map(row => row.bookmaker_id);

            // Identify new preferences to add and deselected ones to remove
            const preferencesToAdd = preferences.filter(bookmakerId => !currentPreferences.includes(bookmakerId));
            const preferencesToRemove = currentPreferences.filter(bookmakerId => !preferences.includes(bookmakerId));

            // Start a transaction
            return pool.query('BEGIN')
                .then(() => {
                    // Insert new preferences
                    const insertPromises = preferencesToAdd.map(bookmakerId => {
                        const insertQuery = `INSERT INTO user_bookmaker_preferences (user_id, bookmaker_id) VALUES ($1, $2);`;
                        return pool.query(insertQuery, [userId, bookmakerId]);
                    });

                    // Remove deselected preferences
                    const removePromises = preferencesToRemove.map(bookmakerId => {
                        const deleteQuery = `DELETE FROM user_bookmaker_preferences WHERE user_id = $1 AND bookmaker_id = $2;`;
                        return pool.query(deleteQuery, [userId, bookmakerId]);
                    });

                    // Execute all insert and delete queries
                    return Promise.all([...insertPromises, ...removePromises]);
                })
                .then(() => pool.query('COMMIT')) // Commit transaction
                .then(() => res.sendStatus(200))
                .catch(err => {
                    console.error('Error updating user preferences:', err.message);
                    pool.query('ROLLBACK'); // Rollback transaction in case of error
                    res.sendStatus(500);
                });
        })
        .catch(err => {
            console.error('Error fetching current user preferences:', err.message);
            res.sendStatus(500);
        });
});


module.exports = router;
