const User = require('../models/user');

module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile</h1>');
    User.findById(req.params.id)
        .catch((err) => {

        })
        .then((user)=>{
            return res.render('user_profile', {
                title: 'User Profile',
                profile_user:user
            });

        });
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}
//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('password != confirm password');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .catch((err) => { console.log('Error in finding user in singing up'); return; })
        .then((user) => {
            if (!user) {
                User.create(req.body)
                    .catch((err) => { console.log('Error in creating user in signing up'); return; })
                    .then((user) => {
                        return res.redirect('/users/sign-in');
                    })
            } else {
                return res.redirect('back');
            }

        });
}

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    //TODO later
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logOut(function (err) {
        if (err) {
            console.log('error in signing out');
            return;
        }
    });
    return res.redirect('/');
}