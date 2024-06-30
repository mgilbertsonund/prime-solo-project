const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 7540;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/bookmakers', bookmakersRouter);
app.use('/api/user/bookmaker-preferences', userBookmakerPreferencesRouter);
app.use('/api/bets', betRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
