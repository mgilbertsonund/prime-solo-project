const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM bookmakers ORDER BY bookmaker_id;';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('Error in GET bookmakers', err);
            res.sendStatus(500);
        })
});

// router.post('/', (req, res) => {
//     const userId = req.user.id;
//     const { selectedBookmakers } = req.body;
//     const queryText = `
//         INSERT INTO user_bookmaker_preferences (user_id, bookmaker_id)
//         VALUES ($1, unnest($2::int[]))
//         ON CONFLICT (user_id, bookmaker_id) DO NOTHING;
//     `;

//     pool.query(queryText, [userId, selectedBookmakers])
//         .then(() => res.sendStatus(201))
//         .catch((err) => {
//             console.log('Error saving bookmaker preferences', err);
//             res.sendStatus(500);
//         });
// });

module.exports = router;