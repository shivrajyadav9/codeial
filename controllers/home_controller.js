//module.exports.actionName=function(req,res){};
module.exports.home = function (req, res) {
    // return res.end('<h1>Express is up for codeial!');
    return res.render('home', {
        title: 'Codeial Home'
    });
}