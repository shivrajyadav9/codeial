const passport = require('passport');
const env = require('./environment');

const JWTStrategy = require('passport-jwt').Strategy;
const extraxtJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: extraxtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, async function (jwtPaylod, done) {
    try {

        let user = await User.findById(jwtPaylod._id);
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    } catch (err) {
        console.log('Error in finding user from jwt : ', err);
    }
}));

module.exports=passport;