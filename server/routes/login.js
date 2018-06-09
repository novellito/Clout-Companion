const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');
const passport = require('passport');

router.post('/test', controller.authorize, controller.test);

// Route to receive the request token from twitter
router.post('/auth/twitter/reverse', controller.twitRev);

// Route to receive oauth information and pass into the passport middleware
router.post(
  '/auth/twitter',
  controller.twit,
  passport.authenticate('twitter-token', { session: false }),
  controller.postPasportAuth,
  controller.generateToken,
  controller.sendToken
);

// Route for adding a facebook user to the db / checking if they exist
router.post('/facebook', controller.generateToken, controller.fbLogin);

module.exports = router;
