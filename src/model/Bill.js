const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const BillSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    amount: Number,
    left: Number,
    price: Number,
    isSell: Boolean,
    date: { type: Number, default: Date.now() }
})

const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill;