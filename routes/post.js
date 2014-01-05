exports.index = function(req, res) {
    
    console.log(req);
    res.render('post', { data: '' });
}

exports.post = function(req, res) {
    console.log(req.body);
    res.render('post', { data: req.body.data });
}
