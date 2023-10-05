const User = require('../models/user');

module.exports.profile = async function (req, res) {
    // return res.end('<h1>User Profile</h1>');
    try {
        const user = await User.findById(req.params.id)
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {
            await User.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email
            })
            return res.redirect('back')
        }
        else {
            return res.status(404).send('Unauthorized');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
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
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('password != confirm password');
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            await User.create(req.body)

            return res.redirect('/users/sign-in');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
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