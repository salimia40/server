const express = require('express');
const Router = express.Router()
const { auth } = require('./controllers')
const passport = require('../utils/auth')


Router.post('/signup', auth.signup);

Router.post('/login', passport.authenticate('local'), auth.login);

Router.get('/logout', auth.logout)

Router.get('/check', auth.check)


module.exports = Router