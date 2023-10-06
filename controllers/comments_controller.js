const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post)
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();
        req.flash('success','Commented added');
        res.redirect('/');
    } catch (err) {
        req.flash('error',err);
        // console.log('Error: ', err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            await Comment.deleteOne({
                '_id': req.params.id
            });
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
          req.flash('success','Comment deleted successfully!!');
            return res.redirect('back');
        }
        req.flash('error','You can not delete this comment!!');
        return res.redirect('back');
    } catch (err) {
        console.log('Error: ', err);
        return;
    }
}