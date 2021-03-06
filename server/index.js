const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const items = require('./routes/items');
const login = require('./routes/login');
const user = require('./routes/user');
require('dotenv').config();
require('./config/passport')();
const app = express();
const port = 5000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mongo:27017/CloutCompanion', {}, err =>
  // Used for local dev
  // mongoose.connect('mongodb://localhost:27017/CloutCompanion', {}, err =>
  err ? console.log(err) : console.log('Connected!')
);
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', items);
app.use('/api/login', login);
app.use('/api/user', user);

// Index Route
app.get('/', (req, res) => res.redirect('http://localhost:3000/'));

app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = app;
