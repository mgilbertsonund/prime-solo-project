const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;