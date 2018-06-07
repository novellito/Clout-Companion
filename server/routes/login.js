const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const passport = require('passport');

const createToken = function(auth) {
  return jwt.sign(
    {
      id: auth.id
    },
    process.env.jwtSecret,
    {
      expiresIn: 60 * 120
    }
  );
};

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

router.route('/auth/twitter/reverse').post(function(req, res) {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback',
        consumer_key: process.env.twitterKey,
        consumer_secret: process.env.twitterSecret
      }
    },
    (err, r, body) => {
      if (err) {
        return res.send(500, { message: e.message });
      }
      const jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.route('/auth/twitter').post(
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: process.env.twitterKey,
          consumer_secret: process.env.twtitterSecret,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      },
      (err, r, body) => {
        if (err) {
          return res.send(500, { message: err.message });
        }

        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;
        next();
      }
    );
  },
  passport.authenticate('twitter-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  },
  generateToken,
  sendToken
);

//token handling middleware
const authenticate = expressJwt({
  secret: process.env.jwtSecret,
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

module.exports = router;
