var http = require('http');
var message = 'I am so happy to be part of the Node Girls workshop!';
var fs = require('fs');

function handler(request, response){
    var endpoint = request.url;
    console.log(endpoint);
    var extension = endpoint.split('.')[1];
    console.log(extension);
    var method = request.method;
    console.log(method);
    if (endpoint === '/') {
      response.writeHead(200,{"content-type":"text/html"});
      fs.readFile(__dirname + '/public/index.html', function(err,file) {
        if (err) {console.log(err);return}
        response.end(file);
      } );
    }
    else {
      response.writeHead(200,{"content-type":"text/" + extension});
      fs.readFile(__dirname + '/public/'+ endpoint, function(err,file) {
        if (err) {console.log(err);return}
          response.end(file);
        });
      }
}

var server = http.createServer(handler);

server.listen(3000, function(){
  console.log("Server is listening to port 3000, ready to accept requests!");
});
