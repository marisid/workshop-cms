module.exports = handler;
var fs = require('fs');

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
        var blogData = '';
        request.on('data', function(chunkOfData){
          blogData += chunkOfData;
        });
        request.on('end',function(){
          var blogEntry = querystring.parse(blogData);
          fs.readFile(__dirname + "/posts.json", function(err,data) {
            if (err) {
              console.log(err);
              return;
            }
            var posts = JSON.parse(data);
            posts[Date.now()] = blogEntry.post;
            fs.writeFile(__dirname + "/posts.json", JSON.stringify(posts), function(err,file) {
              if (err) {
                console.log(err);
                return;
              }
              console.log(file);
              response.end(file);
            });
          })
        })
        response.writeHead(302,{"Location": "/index.html"});
        fs.readFile(__dirname + '/../public/index.html', function(err,file) {
          if (err) {console.log(err);return}
            response.end(file);
        });
    }
    else if (endpoint === '/posts') {
      response.writeHead(200,{"content-type":"application/json"});
      fs.readFile(__dirname + "/posts.json", function(err,file) {
        if (err) {
          console.log(err);
          return;
        }
          console.log("returning post.json object")
          response.end(file);
        });
    }
    else {
        defaultResponse(response,endpoint,extension);
      }
}
