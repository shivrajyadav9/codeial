module.exports.profile = function (req, res) {
    // return res.end('<h1>User Profile</h1>');

    return res.render('user_profile', {
        title: 'Codeial User Profile'
    });
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
    //TODO later
}
//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    //TODO later
}