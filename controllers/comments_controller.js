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

module.exports.destroy = function (req, res) {

    Comment.findById(req.params.id)
        .catch((err) => {
            console.log('error in finding comment');
        })

        .then((comment) => {
            if (comment.user == req.user.id) {
                let postId = comment.post;
                Comment.deleteOne({
                    '_id': req.params.id
                })
                    .catch((err) => {
                        console.log('error in deleting comment')
                    });

                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
                    .catch((err) => {
                        console.log('error in updating comments array in post')
                    });
            }
            return res.redirect('back');
        });
    }