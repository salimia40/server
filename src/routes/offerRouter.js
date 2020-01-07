const express = require('express');
const Router = express.Router()
const { Offer } = require('../model')
const setting = require('../setting')

Router.route('/').post(async (req, res) => {
    var offer = new Offer({
        user: req.user._id,
        remained: req.body.amount,
        ...req.body
    })
    offer = await offer.save()
    res.sendStatus(200)
    var delay = await setting.getValue(setting.values.delay)
    setTimeout(() => {
        Offer.findByIdAndUpdate(offer.id, { expired: true }).exec()
    }, delay * 1000)
})

module.exports = Router