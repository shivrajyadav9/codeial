const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
    try {
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        let post = await Post.find({ _id: newPost._id })
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'user',
                        select: '-password'
                    },

                    {
                        path: 'likes',
                        select: '-__v'
                    }
                ]
            })
            .populate('likes');

        if (req.xhr) {
            const responseData = {
                data: {
                    post: post
                },
                message: 'Post created !!'
            }
            return res.status(200).json(responseData);
        }

        req.flash('success', 'Post published !!');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        // console.log('error in creating post', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        //.id means converting the object id into string
        if (post.user == req.user.id) {
            await Post.deleteOne({ '_id': req.params.id })
            await Comment.deleteMany({ post: req.params.id })

            await Like.deleteMany({ likable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'Post deleted'
                });
            }

            req.flash('success', 'Post and associated comments deleted !!');
            return res.redirect('back');
        } else {
            req.flash('error', 'You can not delete this post');
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        // console.log('Error', err);
        return res.redirect('back');
    }
}