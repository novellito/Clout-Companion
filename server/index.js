const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const items = require('./routes/items');
const ItemsModel = require('./models/item');

const app = express();
const port = 5000;

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://localhost:27017/CloutCompanion',
  {},
  err => (err ? console.log(err) : console.log('Connected!'))
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', items);

// Index Route
app.get('/', (req, res) => res.redirect('http://localhost:3000/'));

app.listen(port, () => console.log(`Server started on port ${port}`));
