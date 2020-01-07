const setting = require('../setting'),
    { User, Offer, Bill } = require('../model')

module.exports.getMaxAvalableDeal = async (userId) => {
    const { charge } = await User.findById(userId, { 'charge': 1 })
    const baseCharge = await setting.getValue(setting.values.baseCharge)
    var mx = Math.floor(charge / baseCharge)
    const offers = await Offer.aggregate([
        { $match: { user: userId, expired: false } },
        { $group: { '_id': null, offers: { $sum: '$remained' } } }
    ])
    console.log(charge)
    console.log(baseCharge)
    console.log(offers)

}