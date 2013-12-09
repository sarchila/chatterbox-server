
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var statusCode = 200;
var objId = 0;
var messages = [{
  username: 'Santiago',
  text: 'testing123',
  roomname: 'all',
  objectId: objId
}];

var sendChats = function(req, res){
  sendResponse(req, res);
};

var addChat = function(req, res){
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    messages.push(JSON.parse(data));
    statusCode = 201;
  });
  sendResponse(req, res);
};

var sendOptions = function(req, res){
  sendResponse(req, res);
};

var sendResponse = function(req, res){
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(messages));
};

var verbs = {
  'GET': sendChats,
  'POST': addChat,
  'OPTIONS': sendOptions
};

exports.handleRequest = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);

  if (verbs[req.method]){
    verbs[req.method](req, res);
  } else {
    statusCode = 405;
    sendResponse(req, res);
  }

};
