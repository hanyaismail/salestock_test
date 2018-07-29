const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../model/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    console.log(username)
    User.findOne({ email: username })
        .then((user) => {
            console.log(user)
            // Return if user not found
            if(!user) {
                return done(null, false, {
                    message: 'User not found'
                })
            }

            if (!user.validPassword(password)) {
                console.log(user.validPassword(password))
                return done(null, false, {
                    message: 'Password is wrong'
                })
            }

            return done(null, user)
        })
        .catch((err) => {
            console.log(err)
            return done(err)
        })
}))