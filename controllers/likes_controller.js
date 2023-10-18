const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function (req, res) {
    try {
        //likes/toggle/?id=abcdef&type=Post
        let likable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likable = await Post.findById(req.query.id).populate('likes');
        } else {
            likable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if alike already exists

        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        //if a like already exists then delete it
        if (existingLike) {
            likable.likes.pull(existingLike._id);
            likable.save();
            await Like.findByIdAndDelete(existingLike._id);
            deleted = true;

        } else {
            //else create a like
            let newLike = await Like.create({
                user: req.user._id,
                likable: req.query.id,
                onModel: req.query.type
            });
            likable.likes.push(newLike._id);
            await likable.save();

        }

        // deleted = false;

        if (req.xhr) {
            return res.status(200).json({
                message: 'Request successfull',
                data: {
                    deleted:deleted
                }
            });
        }

        return res.redirect('back');

    } catch (err) {
        console.log('Error', err);
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}

