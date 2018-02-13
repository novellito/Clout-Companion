const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('./config/database');
const flash      = require('connect-flash');

//var cookieParser = require('cookie-parser');


// Connect To Database
mongoose.connect(config.database,{useMongoClient: true});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users    = require('./routes/users');
const facebook = require('./routes/facebook');

// Port Number
const port = process.env.PORT || 8080;

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
// CORS Middleware
app.use(cors(corsOption));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/auth', facebook);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});


  // app.get('*', (req, res)=>{
  //   res.sendFile(path.join(__dirname, 'public/index.html'));
  // });


// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});