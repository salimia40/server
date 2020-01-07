const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    Offer = require('./Offer'),
    Bill = require('./Bill')

const UserSchema = new Schema({
    email: String,
    password: String,
    hash: String,
    charge: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 }
})

UserSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    var password = this.password || '';
    delete this.password;
    if (!this.hash) {
        this.hash = bcrypt.hashSync(password, 10);
    }
    return next();
})

UserSchema.methods.public = function () {
    delete this.hash;
    return this;
}

UserSchema.methods.authenticate = function (password) {
    if (bcrypt.compareSync(password, this.hash) && this.attempts < 20) {
        this.attempts = 0;
        this.save();
        delete this.hash;
        return this;
    }
    else {
        this.attempts++;
        this.save();
        return false;
    }
}

const User = mongoose.model('User', UserSchema)

module.exports = User;