//module.exports.actionName=function(req,res){};
import Post from '../models/post.js';
import User from '../models/user.js';

// using Async Await
 let home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'comments',
                populate: [{
                    path: 'user',
                    select: '-password'
                }, {
                    path: 'likes',
                    select: '-__v'
                }]
            })
            .populate('likes');

        let users = await User.find({});

        //if user is logged in render friends
        let friends = [];
        if (req.user) {
            let current_user = await User.findById(req.user._id).select('-password')
                .populate({
                    path: 'friendships',
                    populate: {
                        path: 'from_user to_user',
                        select: '-password'
                    }
                })
            for (let friendship of current_user.friendships) {
                if (friendship.from_user.id == req.user.id) {
                    friends.push(friendship.to_user);
                }
                else {
                    friends.push(friendship.from_user);
                }
            }
        }

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users,
            user_friends: friends
        });
    }
    catch (err) {
        console.log('Error', err);
        return;
    }
}

export default home;
//Using Promises

// module.exports.home = function (req, res) {
//     // return res.end('<h1>Express is up for codeial!');
//     Post.find({}).populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .catch((err) => {
//             console.log('error in finding posts');
//         })
//         .then((posts) => {
//             User.find({})
//                 .catch((err) => {

//                 })
//                 .then((users) => {
//                     return res.render('home', {
//                         title: 'Codeial | Home',
//                         posts: posts,
//                         all_users: users
//                     });
//                 });
//         });
// }