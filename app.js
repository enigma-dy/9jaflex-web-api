const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const passport = require('passport');
const connectToDatabase = require('./config/db');
const app = express();


dotenv.config();


connectToDatabase();

const accessLogStream = require('./config/logger');
const corsOptions = require('./config/cors')(["http://localhost:1234", "https://ninejaflex-web-api.onrender.com"]);

// Middleware
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(passport.initialize());
require('./config/passport');


const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const genreRouter = require('./routes/genre');
const directorsRouter = require('./routes/directors');

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.use('/genre', genreRouter);
app.use('/directors', directorsRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error occurred");
});

const port = 5000;
app.listen(port, () => {
  console.log("Listening on Port " + port);
});
