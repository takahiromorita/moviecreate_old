exports.index = function(req, res) {
    console.log(req.query);
    res.render('post', { data: '' });
}

exports.post = function(req, res) {
    console.log(req.body);
    res.render('post', { data: req.body.data });
}
