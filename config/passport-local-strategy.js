const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) {

        //done is a function inbuit in passport takes two arguments
        //find the user and establish the identity
        try {
            let user = await User.findOne({ email: email })
            if (!user || user.password != password) {
                req.flash('error', 'Invalid username/password')
                // console.log('invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            console.log('error in finding user --> passport');
            req.flash('error', err);
            return done(err);
        }
    }
));

//serialize the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .catch((err) => {
            console.log('error in finding user --> passport');
            return done(err);
        })
        .then((user) => {
            // console.log('user',user)
            return done(null, user);
        })
});

//check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in (passport js puts isAuthenticated with the req)
    // console.log('req.isauthenticated',req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
        return;
    }
    //if the user is not signed in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;