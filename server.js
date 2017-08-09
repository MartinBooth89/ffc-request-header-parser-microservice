// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.redirect('/api/whoami');
});

app.get("/api/whoami", (request, response) => {
  var ipAddress = request.headers["x-forwarded-for"].split(',')[0];
  var language = request.headers["accept-language"].split(',')[0];
  
  var osRegex = /Mozilla\/\d[\.\d]* \((.*?)\)/g;
  var regexResult = osRegex.exec(request.headers["user-agent"]);
  
  var software = regexResult[1];
  
  response.setHeader('ContentType', 'application/json');
  response.send({ipAddress: ipAddress, language: language, software: software});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
