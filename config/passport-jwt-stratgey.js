const passport = require('passport');

const JWTStratgey = require('passport-jwt').Strategy;
const extraxtJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: extraxtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStratgey(opts, async function (jwtPaylod, done) {
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