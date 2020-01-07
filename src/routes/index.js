const express = require('express');

const authRouter = require('./auhRouter')
const offerRouter = require('./offerRouter')

const Router = express.Router()

Router.use(authRouter)
Router.use('/offer', offerRouter)

module.exports = Router