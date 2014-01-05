
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var post = require('./routes/post');
var json = require('./routes/json');
var tenki = require('./routes/tenki');
var socket = require('./routes/socket');
var http = require('http');
var path = require('path');
var sanitize = require('validator').sanitize;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/post', post.index);
app.post('/post', post.post);
app.get('/json', json.test);
app.get('/tenki', tenki.get);
app.get('/socket', socket.index);
app.get('/client', function(req,res){res.render('client');});
app.get('/color', function(req,res){res.render('color');});

var server =  http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);
var namespace = io.of('/socket')

namespace.on('connection',function(socket){
  console.log('connected!!');
  socket.on('message', function(data){
    console.log();
    var msg = sanitize(data.value).entityEncode();
    namespace.emit('message', {value: msg});
    //io.sockets.emit('message', {value: msg});
    //io.sockets.emit('message', {value: data.value});
  });

  socket.on('color', function(rgb){
    namespace.emit('color', rgb);
  });

  socket.on('disconnect', function(){
    console.log('disconnected!');
  });
});

