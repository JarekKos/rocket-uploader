var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var port = process.env.PORT || 8080;

app.listen(port);

console.log('App works on port:', port);
