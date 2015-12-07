var express = require('express');
var request = require('request');
var app = express();
var apiKey = '6e5b9e58ec43741cfbae11cfd81e6b';

app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

var url = 'http://api.lyricsnmusic.com/songs?api_key=6e5b9e58ec43741cfbae11cfd81e6b&q=';

app.get('/', function(req, res) {
  var queryUrl = url + req.query.query;
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.json(data);
    } else {
      res.json({message: error});
    }
  });
});

app.listen(process.env.PORT || 4730);