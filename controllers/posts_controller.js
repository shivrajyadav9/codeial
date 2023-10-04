const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
        .catch((err) => {
            console.log('error in creating post');
            return;
        })
        .then((post) => {
            return res.redirect('back');
        });
}