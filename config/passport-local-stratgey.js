const passport = require('passport');

const LocalStratgey = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStratgey({
    usernameField: 'email'
},
    function (email, password, done) {
        //done is a function inbuit in passport takes two arguments
        //find the user and establish the identity
        User.findOne({ email: email })
        .catch((err) =>{
                console.log('error in finding user --> passport');
                return done(err);
            })
            .then((user)=>{
            if (!user || user.password != password) {
                console.log('invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        });

    }
));

//serialize the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id)
    .catch((err)=>{
        console.log('error in finding user --> passport');
        return done(err);
    })
    .then((user)=>{
        return done(null, user);
    })
});

module.exports=passport;