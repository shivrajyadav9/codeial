//module.exports.actionName=function(req,res){};
const Post = require('../models/post');
const User = require('../models/user');

// using Async Await

module.exports.home = async function (req, res) {
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

        // console.log(posts[1].comments[0].likes);
        let current_user=await User.findById(req.user._id). select('-password')
        .populate({
            path:'friendships',
            populate:{
                path:'from_user to_user',
                select:'-password'
            }
        });
        let friends=[];
        for( let friendship of current_user.friendships){
            if(friendship.from_user.id==req.user.id){
                friends.push(friendship.to_user);
            }
            else{
                friends.push(friendship.from_user);
            }
        }
        let users = await User.find({});
        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users,
            user_friends:friends,
            current_user:req.user
        });

    } catch (err) {
        console.log('Error', err);
        return;
    }

}
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