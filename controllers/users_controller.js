const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const ResetPasswordToken = require('../models/reset_password_token');
const crypto = require('crypto');
const usersMailer = require('../mailers/users_mailer');

module.exports.profile = async function (req, res) {
    // return res.end('<h1>User Profile</h1>');
    try {
        const user = await User.findById(req.params.id)
        const users = await User.find({});
        let user_posts = await Post.find({ user: req.params.id })
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,
            all_users: users,
            user_posts: user_posts
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
                if (err) { console.log('******Multer Error ', err); return; }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    if (user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //this is saving the path of the uploaded file
                    // console.log(req.file);
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
        return res.redirect(`/users/profile/${req.user.id}`);
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

module.exports.forgotPassword = function (req, res) {
    return res.render('forgot_password', {
        title: 'Forgot Password?'
    });
}

module.exports.createForgotPasswordToken = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        // console.log(req.body);
        if (!user) {
            // console.log('user not found');
            res.redirect('back');
        }
        else {
            let token = await ResetPasswordToken.findOne({ user: user._id });
            if (token) {
                await ResetPasswordToken.findOneAndUpdate({ token: token.token }, { isValid: true });
            }
            else {
                await ResetPasswordToken.create({
                    user: user._id,
                    token: crypto.randomBytes(20).toString('hex'),
                    isValid: true
                });
            }
            let resetPasswordToken = await ResetPasswordToken.findOne({ user: user._id }).populate('user');
            usersMailer.resetPassword(resetPasswordToken);
            return res.redirect('/users/sign-in')
        }

    } catch (err) {
        console.log('Error in creating forgot password token ');
    }
};

module.exports.resetPassword = function (req, res) {
    res.cookie('resetPasswordToken', req.params.token);
    return res.render('new_password', {
        title: 'New Password',
        resetPasswordToken: req.params.token
    })
}

module.exports.newPassword = async function (req, res) {
    try {
        let token = await ResetPasswordToken.findOne({ token: req.cookies.resetPasswordToken });
        if ( token.isValid && req.body.password === req.body.confirm_password) {
            await User.findByIdAndUpdate({ _id: token.user }, { password: req.body.password });
            await ResetPasswordToken.findOneAndUpdate({token: req.cookies.resetPasswordToken},{isValid:false});

            res.clearCookie('resetPasswordToken');
            return res.redirect('/users/sign-in');
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error in updating password');
    }
}


module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect(`/users/profile/${req.user.id}`);
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