const jwt = require('jsonwebtoken');
const request = require('request');
const UserModel = require('../models/user');

// function to generate the jwt token
exports.generateToken = (req, res, next) => {
  // generate token for a fb user
  if (req.body.fb) {
    req.token = jwt.sign(
      {
        id: req.body.id
      },
      process.env.jwtSecret,
      {
        expiresIn: 5 //60 * 120
      }
    );
  } else {
    req.token = jwt.sign(
      {
        id: req.auth.id
      },
      process.env.jwtSecret,
      {
        expiresIn: 5 //60 * 120
      }
    );
  }
  return next();
};

// send the token
exports.sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

// Authorization middleware for managing requests
exports.authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.jwtSecret);
    next();
  } catch (err) {
    if (err.message === 'jwt expired') {
      res.status(401).json({ message: 'Token has expired!' });
    } else {
      res.status(401).json({ message: 'Invalid Token - Auth Failed!' });
    }
  }
};

exports.test = (req, res, next) => {
  console.log(req.body);
  res.send('ok');
};

// function to receive request token from twitter
exports.twitRev = (req, res) => {
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
};

// function to reveive oauth info
exports.twit = (req, res, next) => {
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
        return res.status(500).send({ message: err.message });
      }
      try {
        const bodyString =
          '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;
        next();
      } catch (err) {
        return res
          .status(409)
          .send({ status: 409, message: 'Could not be authenticated' });
      }
    }
  );
};

exports.postPasportAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('User Not Authenticated');
  }
  // prepare token for API
  req.auth = {
    id: req.user.id
  };

  return next();
};

// handle fb auth & set a token in the header
exports.fbLogin = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  console.log(req.body);
  UserModel.upsertNewUser(req.body, (err, user) => {
    console.log(`User ${user.username} has been verified!`);
    res.status(200).send({
      uid: user.username,
      msg: `User ${user.username} has been verified!`
    });
  });
};
