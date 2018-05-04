const JwtStrategy           = require('passport-jwt').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
// var LocalStrategy        = require('passport-local').Strategy;

const ExtractJwt            = require('passport-jwt').ExtractJwt;
const User                  = require('../models/user');
const config                = require('../config/database')

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

module.exports = function (passport) {

    passport.use(new FacebookTokenStrategy({
        clientID: '',
        clientSecret: ''
    }, function (accessToken, refreshToken, profile, done) {

        // console.log(profile.id);
        //   User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        //     return done(err, user);   });

        User
            .findOne({
                'facebook.id': profile.id
            }, function (err, user) {
                if (err) 
                    return done(err);
                
                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();

                    newUser.facebook.id    = profile.id;
                    newUser.facebook.email = profile.emails[0].value
                    newUser.facebook.token = accessToken;
                    newUser.save((err) => {
                        if (err) 
                            throw err;
                       return done(null, newUser);

                    });
                }
            })

        // console.log("profile");
        // console.log(profile.id);
        // console.log(profile.emails[0].value);
        // return done(err, user);

    }));

};