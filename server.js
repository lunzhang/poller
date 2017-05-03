var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
require('./server/db/db');
var api = require('./server/api/index');
var env = process.env.NODE_ENV || 'dev';

if(env === 'dev'){
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',api);
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.set('port', (port));
server.listen(port);
