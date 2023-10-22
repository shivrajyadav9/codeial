import passport from 'passport';
import passportGoogle from 'passport-google-oauth'
const googleStrategy = passportGoogle.OAuth2Strategy;
import crypto from 'crypto';
import env from './environment.js';

import User from '../models/user.js';

//tell passport to use a new stratgey gor google log in
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
},
    function (accessToken, refreshToken, profile, done) {

        //find user
        User.findOne({ email: profile.emails[0].value })
            .catch((err) => {
                console.log('Error in google stratgey passport:', err);
                return;
            })
            .then((user) => {
                console.log(accessToken, refreshToken);
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
                        .catch((err) => {
                            console.log('Error in creating user google stratgey passport:', err);
                            return;
                        }).then((user) => {
                            return done(null, user);
                        })
                }
            })
    }
));

export default passport;