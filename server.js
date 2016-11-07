var http = require('http');
var server = http.createServer();

server.listen(3000, function(){
  console.log("Server is listening to port 3000, ready to accept requests!");
});
