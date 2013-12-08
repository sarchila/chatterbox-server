
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var statusCode = 200;
var messages = [];

exports.handleRequest = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);
  sendResponse(res);
};

var sendResponse = function(res){
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(messages));
};
