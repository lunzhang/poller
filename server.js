var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var port = process.env.PORT || 80;

app.use('/public', express.static(__dirname + '/public'));
app.set('port', (port));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

server.listen(port);
