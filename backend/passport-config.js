const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const userState={};

const initializeConfig = (passport, email, passwordHash) => {
    console.log("passport function triggered");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        if (username === email) {
            console.log(username);
            bcrypt.compare(password, passwordHash, (err, res) => {
                if (res)
                    return done(null, userState)
                else
                    return done(null, false, { message: 'Incorrect password' })
            })
        }
        else
            return done(null, false, { message: 'Incorrect username' })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
        userState = user;
    });

    passport.deserializeUser((id, done) => {
        done(null, userState);
    });
}

module.exports = initializeConfig;