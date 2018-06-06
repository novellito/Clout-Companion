const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const items = require('./routes/items');
const ItemsModel = require('./models/item');

const app = express();
const port = 5000;

// mongoose.Promise = global.Promise;

// mongoose.connect(
//   'mongodb://localhost:27017/CloutCompanion',
//   {},
//   err => (err ? console.log(err) : console.log('Connected!'))
// );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'whatever', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// app.use('/api', items);

// Index Route
//  res.redirect('http://localhost:3000/'))
app.get('/', (req, res) => res.send('success!'));
app.get('/twitter/login', passport.authenticate('twitter'));

app.get(
  '/twitter/return',
  passport.authenticate('twitter', {
    failureRedirect: '/reee'
  }),
  function(req, res) {
    res.redirect('/');
  }
);
app.listen(port, () => console.log(`Server started on port ${port}`));
