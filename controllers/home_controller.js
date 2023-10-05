//module.exports.actionName=function(req,res){};
const Post = require('../models/post');
module.exports.home = function (req, res) {
    // return res.end('<h1>Express is up for codeial!');
    Post.find({}).populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .catch((err) => {
            console.log('error in finding posts');
        })
        .then((posts) => {
            return res.render('home', {
                title: 'Codeial | Home',
                posts: posts
            });
        })
}