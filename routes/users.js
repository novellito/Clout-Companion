const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({name: req.body.name, email: req.body.email, username: req.body.username, password: req.body.password});

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: 'failed to register'});
    } else {
      res.json({success: true, msg: 'user registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) 
      throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.local.password, (err, isMatch) => {
      if (err) 
        throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});
router.post('/profUp', passport.authenticate('jwt', {session: false}), (req, res, next) => {

  let currUser = User.findById(req.user._id, (err, user) => {

    if (err) {
      res.json({success: false, msg: 'failed to add schedule'});
    } else {
      res.json({success: true, msg: 'Schedule Added!'});
      user
        .sched
        .push(req.body);
      user.save();
      console.log('User Schedule saved!');
    }

  });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});


//maybe need get profile for fb & twitter
module.exports = router;