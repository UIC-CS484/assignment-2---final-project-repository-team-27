const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const userState={};

const initializeConfig = (passport, email, passwordHash) => {

    passport.use(new LocalStrategy({
        usernameField: 'loginEmail',
        passwordField: 'loginPassword'
    }, (username, password, done) => {
        console.log(username, password);
        if (username === email) {
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