const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');

// package needed: crypto, jsonwebtoken, passport, passport-local
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
})

userSchema.methods.setPassword = function (password) {
    console.log(password)
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 
    'sha512').toString('hex');
    console.log(this.salt)
}

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,
    'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = () => {
    let expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, jwtKey);
};

module.exports = User = mongoose.model('User', userSchema);