//module.exports.actionName=function(req,res){};
module.exports.home = function (req, res) {
    // return res.end('<h1>Express is up for codeial!');
    res.cookie('user_id', '25');
    console.log(req.cookies);

    return res.render('home', {
        title: 'Codeial Home'
    });
}