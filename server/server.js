const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const oddsRouter = require('./routes/odds.router');
const bookmakersRouter = require('./routes/bookmakers.router');
const userBookmakerPreferencesRouter = require('./routes/userpreferences.router');
const betRouter = require('./routes/bet.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist'))); // Serving static files from 'dist'

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/bookmakers', bookmakersRouter);
app.use('/api/user/bookmaker-preferences', userBookmakerPreferencesRouter);
app.use('/api/bets', betRouter);

// Handle SPA - Serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
