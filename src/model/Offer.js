const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const OfferSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    amount: Number,
    price: Number,
    isSell: Boolean,
    remained: Number,
    date: { type: Number, default: Date.now() },
    expired: { type: Boolean, default: false }
})

const Offer = mongoose.model('Offer', OfferSchema)

module.exports = Offer;