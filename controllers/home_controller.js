//module.exports.actionName=function(req,res){};
const Post = require('../models/post');
const User = require('../models/user');

// using Async Await

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({}).populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users

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