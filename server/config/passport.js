const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new TwitterTokenStrategy(
      {
        consumerKey: process.env.twitterKey,
        consumerSecret: process.env.twitterSecret
      },
      (token, tokenSecret, profile, done) => {
        User.upsertTwitterUser(profile, (err, user) => {
          return done(err, user);
        });
      }
    )
  );
};
