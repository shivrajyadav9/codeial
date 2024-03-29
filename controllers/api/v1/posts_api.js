import Post from '../../../models/post.js';
import Comment from '../../../models/comment.js';

let index= async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200,{
        message:'list of posts',
        posts:posts
    })
}

let destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        //.id means converting the object id into string
        if (post.user == req.user.id) {
            await Post.deleteOne({ '_id': req.params.id })
            await Comment.deleteMany({ post: req.params.id })

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id: req.params.id
            //         },
            //         message:'Post deleted'
            //     });
            // }

            // req.flash('success', 'Post and associated comments deleted !!');
            return res.json(200,{
                message:"post and associated comments deleted successfully"
            })
        } else {
            
            return res.json(401,{
                message:'you can not delete this post'
            });
        }

    } catch (err) {
        // req.flash('error', err);
        console.log('Error', err);
        return res.json(500,{
            message:'internal server error'
        })
    }
}

let postsApi={index,destroy};
export default postsApi;