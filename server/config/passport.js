const passport = require('passport');
const User = require('../models/user');
const TwitterTokenStrategy = require('passport-twitter-token');

// Passport twitter configuration strategy
module.exports = () => {
  passport.use(
    new TwitterTokenStrategy(
      {
        consumerKey: process.env.twitterKey,
        consumerSecret: process.env.twitterSecret
      },
      (token, tokenSecret, profile, done) => {
        User.upsertNewUser(profile, (err, user) => {
          return done(err, user);
        });
      }
    )
  );
};
