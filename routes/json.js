exports.test = function(req, res) {
    var type = req.query.type;
    res.contentType('application/json');
    if (type === 'hoge') {
        var data = { name: 'hoge', type: type };
    } else {
        var data = { name: 'shichiku', blood: 'B', weight: '65kg' };
    }
    res.send(JSON.stringify(data));
}
