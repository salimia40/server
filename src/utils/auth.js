
const { User } = require('../model')
const LocalStrategy = require('passport-local')
var passport = require('passport');

passport.serializeUser(function (user, done) {
    console.log(user)
    done(null, user.id);
});


// Reading your user base on the user.id
passport.deserializeUser(async (id, done) => {
    var user = await User.findById(id)
    done(null, user.public());
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, done) {
        User.find({ email: email.toLowerCase() })
            .then(function (users) {

                // Was a user found?
                if (users.length) {

                    // Attempt authenticating with the supplied password
                    if (users[0].authenticate(password)) {
                        done(null, users[0].public());
                    }

                    // Supplied password incorrect
                    else {
                        setTimeout(function () {
                            done("Sorry, your password is incorrect", false);
                        }, 3000);
                    }
                }

                // No user was found
                else {
                    return done("Sorry, no account was found for that email", false);
                }
            });
    }));

module.exports = passport