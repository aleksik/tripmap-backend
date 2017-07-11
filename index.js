const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const app = express();

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// Additional middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.get('/', (req, res) => res.sendStatus(200));
app.use('/users', require('./routes/users'));
app.use('/places', require('./routes/places'));

app.listen(config.port, console.log(`Listening on port ${config.port}`));