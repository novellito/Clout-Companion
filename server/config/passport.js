var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
module.exports = function(passport) {
  passport.use(
    new Strategy(
      {
        consumerKey: '',
        consumerSecret: '',
        callbackURL: 'http://localhost:3000/twitter/return'
      },
      function(token, tokenSecret, profile, callback) {
        console.log(profile);
        return callback(null, profile);
      }
    )
  );

  passport.serializeUser(function(user, callback) {
    callback(null, user);
  });

  passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
  });
};
