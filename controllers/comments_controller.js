const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .catch((err) => {

        })
        .then((post) => {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                .catch((err) => {

                })
                .then((comment) => {
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                });
        });
}