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
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('******Multer Error ', err); return ; }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    //this is saving the path of the uploaded file
                    console.log(req.file);
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();

                req.flash('success', 'Profile updated');
                return res.redirect('back');
            });
        }

        else {
            req.flash('error', 'You can not update this profile !!');
            return res.status(404).send('Unauthorized');
        }

    } catch (err) {
        req.flash('error', err);
        // console.log('Error', err);
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
        req.flash('error', 'Password does not match');
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            await User.create(req.body)
            req.flash('success', 'Account created successfully !!');
            return res.redirect('/users/sign-in');

        } else {
            req.flash('error', 'Account already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully!!');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logOut((err) => {
        if (err) {
            req.flash('error', 'Could not log out');
            console.log('Error', err);
            return res.redirect('/');
        } else {
            req.flash('success', 'You have logged out !!');
            return res.redirect('/');
        }
    });

}