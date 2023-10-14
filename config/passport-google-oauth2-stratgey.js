const passport = require('passport');
const googleStratgey = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new stratgey gor google log in
passport.use(new googleStratgey({
    clientID: '91239784649-o73tj6jauue87rloqidisn5itq0nmhg9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {

        //find user
        User.findOne({ email: profile.emails[0].value })
            .catch((err) => {
                console.log('Error in google stratgey passport:', err);
                return;
            })
            .then((user) => {
                console.log(accessToken,refreshToken);
                console.log(profile);

                //if found set this user as req.user
                if (user) {
                    return done(null, user);
                }
                else {

                    //if not found, create the user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    })
                    .catch((err)=>{
                        console.log('Error in creating user google stratgey passport:', err);
                        return;
                    }).then((user)=>{
                        return done(null,user);
                    })
                }
            })
    }
));

module.exports=passport;