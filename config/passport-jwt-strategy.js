import passport from 'passport';
import env from './environment.js';

import JWT from 'passport-jwt'
 const JWTStrategy = JWT.Strategy;
// import extraxtJWT from 'passport-jwt'
const extraxtJWT = JWT.ExtractJwt;

import User from '../models/user.js';

let opts = {
    jwtFromRequest: extraxtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, async function (jwtPaylod, done) {
    try {

        let user = await User.findById(jwtPaylod._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (err) {
        console.log('Error in finding user from jwt : ', err);
    }
}));

export default passport;