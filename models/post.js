import  mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of the ids of all comments in this post in post Schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;