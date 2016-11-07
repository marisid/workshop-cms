module.exports = defaultResponse;
var fs = require('fs');

function defaultResponse(response,endpoint, extension) {
  response.writeHead(200,{"content-type":"text/" + extension});
  fs.readFile(__dirname + '/../public'+ endpoint, function(err,file) {
    if (err) {console.log(err);return}
      response.end(file);
    });
}
