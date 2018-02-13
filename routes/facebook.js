const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');
const expressJwt = require('express-jwt');

let createToken = function (auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret', {
    expiresIn: 60 * 120
  });
};

let generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  next();
};

let sendToken = function (req, res) {

  res.setHeader('x-auth-token', req.token);

  res.status(200).send(req.auth);

};

// post route for retrieving facebook info in front end
router.post('/facebook', passport.authenticate('facebook-token', {session: false}), function (req, res, next) {

  if (!req.user) {
    return res.sendStatus(401, 'User Not Authenticated');
  }

  req.auth = {
    id: req.user.id
  };
  next();
}, generateToken, sendToken);

// middleware for reading the header token
let authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function (req) {
    if (req.headers.authorization) {
      return req.headers.authorization;
    }
    return null;
  }
});

let getCurrentUser = function (req, res, next) {
  console.log('getcurrUser');

  User.findById(req.auth.id, function (err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

let getOne = function (req, res) {

  let user = req.user.toObject();
  // Trim the response that gets sent to front end
  delete user['facebook']['token'];
  delete user['facebook']['id'];
  delete user['__v'];

  res.json(user);
};

router.get('/me', authenticate, getCurrentUser, getOne);

module.exports = router;