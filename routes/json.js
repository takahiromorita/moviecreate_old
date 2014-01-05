exports.test = function(req, res) {
    var type = req.query.type;
    res.contentType('application/json');
    var data;
    if (type === 'hoge') {
        data = { name: 'hoge', type: type };
    } else {
        data = { name: 'shichiku', blood: 'B', weight: '65kg' };
    }
    res.send(JSON.stringify(data));
}
