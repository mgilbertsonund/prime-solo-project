const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

// Handles POST request with new user data
router.post('/registration', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      if (err.code === '23505') {
        // Unique violation error code
        console.log('User registration failed: username already exists');
        res.status(409).send('Username already exists');
      } else {
        console.error('User registration failed:', err); // Use console.error for error logging
        res.sendStatus(500);
      }
    });
});

// Handles login form authenticate/login POST
router.post('/login', (req, res, next) => {
  userStrategy.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Login error:', err); // Log the error
      return next(err);
    }
    if (!user) {
      // User not found or incorrect password
      console.log('Login failed: user not found or incorrect password');
      return res.status(401).send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error after authentication:', err); // Log the error
        return next(err);
      }
      res.sendStatus(200);
    });
  })(req, res, next);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err); // Log the error
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
