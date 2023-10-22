import Comment from '../models/comment.js';
import Post from '../models/post.js';
import Like from '../models/like.js';
import commentsMailer from '../mailers/comments_mailer.js';

// import commentEmailWorker from '../workers/comment_email_worker.js';
import kue from '../config/kue.js'
const queue = kue.default;


let create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post)
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();
        // console.log('comments controller');

        comment = await comment.populate('user', 'name email')//.execPopulate();

        //add a job to queue named emails or create a queue named emails and add a job to it
        let job = queue.create('emails', comment).save(function (err) {
            if (err) {
                console.log('error in sending to the queue', err);
                return;
            }
            console.log('job enqueued', job.id);
        })

        // commentsMailer.newComment(comment);

        req.flash('success', 'Commented added');
        res.redirect('/');
    } catch (err) {
        req.flash('error', err);
        // console.log('Error: ', err);
        return;
    }
}

let destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)

        if (comment.user == req.user.id) {
            let postId = comment.post;

            await Comment.findByIdAndDelete(req.params.id);
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            await Like.deleteMany({ likable: comment._id, onModel: 'Comment' });

            req.flash('success', 'Comment deleted successfully!!');
            return res.redirect('back');
        }

        req.flash('error', 'You can not delete this comment!!');
        return res.redirect('back');

    } catch (err) {
        console.log('Error: ', err);
        return;
    }
}

let commentsController={ create, destroy };
export default commentsController;