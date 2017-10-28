const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const config   = require('../config/database');
const User     = require('../models/user');

router.post('/facebook', passport.authenticate('facebook-token'), function (req, res) {
    // do something with req.user
    res.send(req.user
        ? 200
        : 401);
        console.log(res);
});

module.exports = router;