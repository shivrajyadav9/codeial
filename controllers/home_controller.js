//module.exports.actionName=function(req,res){};
module.exports.home = function (req, res) {
    return res.render('home', {
        title: 'Codeial Home'
    });
}