module.exports = handler;

var message = 'I am so happy to be part of the Node Girls workshop!';
var querystring = require('querystring');
var defaultResponse = require('./defaultPage.js');

function handler(request, response){
    var endpoint = request.url;
    console.log(endpoint);
    var extension = endpoint.split('.')[1];
    console.log(extension);
    var method = request.method;
    console.log(method);
    if (endpoint === '/') {
      defaultResponse(response,"/index.html","html");
    }
    else if(endpoint === '/create-post'){
        var allTheData = '';
        request.on('data', function(chunkOfData){
          allTheData += chunkOfData;
        });
        request.on('end',function(){
          var convertedData = querystring.parse(allTheData);
          console.log(convertedData);
          response.writeHead(302, {'Location': '/index.html'});
          response.end();
        });
    }
    else {
        defaultResponse(response,endpoint,extension);
      }
}
