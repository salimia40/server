// intialize express server
const express = require('express');
const app = express();

// enable cross origin requests
const cors = require('cors')
app.use(cors())

// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
const helmet = require('helmet')
app.use(helmet())

// use gzip compression to increase performance
const compression = require('compression')
app.use(compression())

// initialize session with redis
const session = require('express-session');
const sessionStore = require('./utils/sessionStore')

app.use(session(
    {
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.ENVIRONMENT !== 'development' && process.env.ENVIRONMENT !== 'test',
            maxAge: 2419200000
        },
        secret: process.env.SECRET_KEY_BASE
    }
))

// bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

// authentication
const passport = require('./utils/auth')
app.use(passport.initialize());
app.use(passport.session());

module.exports = app