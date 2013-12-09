
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var statusCode = 200;
var objId = 0;
var timeStamp = new Date().toISOString();
var messages = [{
    username: 'Santiago',
    text: 'Hello, World!',
    roomname: 'all',
    updatedAt: timeStamp,
    createdAt: timeStamp,
    objectId: objId
  }
];

var addServerProperties = function(msg){
  msg.updatedAt = msg.createdAt = new Date().toISOString();
  msg.objectId = ++objId;
};

var sendChats = function(req, res){
  statusCode = 200;
  sendResponse(req, res);
};

var addChat = function(req, res){
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    message = JSON.parse(body);
    addServerProperties(message);
    messages.push(message);
    statusCode = 201;
    sendResponse(req, res);
  });
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
