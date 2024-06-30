const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const pg = require('pg');
const sessionMiddleware = require('./modules/session-middleware'); // Assuming you have a session middleware
const userRouter = require('./routes/user.router');
const oddsRouter = require('./routes/odds.router');
const bookmakersRouter = require('./routes/bookmakers.router');
const userBookmakerPreferencesRouter = require('./routes/userpreferences.router');
const betRouter = require('./routes/bet.router');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your actual session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure: true in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/user', userRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/bookmakers', bookmakersRouter);
app.use('/api/user/bookmaker-preferences', userBookmakerPreferencesRouter);
app.use('/api/bets', betRouter);

// PostgreSQL connection pool setup
let pool;
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // For local development or adjust for production
        }
    });
} else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'prime_app', // Replace with your database name
        // Add other credentials like user and password if needed
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the app for testing or other modules
