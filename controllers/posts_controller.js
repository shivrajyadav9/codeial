const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .catch((err) => {
            console.log('error in finding post while deleting');
        })
        .then((post) => {
            //.id means converting the object id into string
            if (post.user == req.user.id) {
                Post.deleteOne({ '_id': req.params.id })
                .catch((err) => {
                    console.log('error in deleting post')
                });
                Comment.deleteMany({ post: req.params.id })
                    .catch((err) => {
                        console.log('error in deleting comments while deleting post');
                        return res.redirect('back');
                    })
                    .then(() => {

                    })
            }
            return res.redirect('back');
        });
}