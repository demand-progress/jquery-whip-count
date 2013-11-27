var express = require('express');
var app     = express();
var server  = require('http').createServer(app);

config = {
  port : 3003
};

app.configure(function() {
  app.use(express.static(__dirname + '/examples'));
  app.use(app.router);
});


server.listen(config.port);
console.log('Listening on port ' + (config.port + ''));