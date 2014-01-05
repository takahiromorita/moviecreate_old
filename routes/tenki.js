var request = require('superagent');

exports.get = function(req, res) {
    request
        .get('http://api.openweathermap.org/data/2.5/weather')
        .query({q: 'Shibuya,jp'})
        .end(function(result){
            res.send(JSON.stringify(result.body.weather));
        });
}
