const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool
    .query('SELECT * FROM "users" WHERE id = $1', [id])  // Update table name to "users"
    .then((result) => {
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        done(null, user);
      } else {
        // user not found
        done(null, null);
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user ', error);
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    pool
      .query('SELECT * FROM "users" WHERE username = $1', [username])  // Update table name to "users"
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // All good! Passwords match!
          done(null, user);
        } else {
          // Not good! Username and password do not match.
          done(null, null);
        }
      })
      .catch((error) => {
        console.log('Error with query for user ', error);
        done(error, null);
      });
  })
);

module.exports = passport;
