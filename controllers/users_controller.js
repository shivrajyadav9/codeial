const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .catch((err) => { console.log('error finding user in profile'); return; })
            .then((user) => {
                if (user) {
                    return res.render('user_profile', {
                        title: 'Codeial User Profile',
                        user: user
                    });
                } else {
                    return res.redirect('/users/sign-in');
                }
            });
    } else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}
//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
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
    //find the user
    User.findOne({ email: req.body.email })
        .catch((err) => {
            console.log('Error in finding user in signing in');
        })
        .then((user) => {

            //handle if the user found
            if (user) {
                //handle password doesn't match
                if (user.password != req.body.password) {
                    return res.redirect('back');
                }

                //handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            } else {
                //handle user not found
                return res.redirect('back');
            }

        })
}

module.exports.logOut = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}