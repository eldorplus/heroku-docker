'use strict';

const express = require('express');
const app = express();
const config = require('./config/config.js');
const path = require('path');


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	console.log(process.env);
  response.send('Hello World! Hey girl, let\'s fingerbang!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
	console.log("FINGER: " + process.env.FINGER);
	console.log("config: " + config.appName);
	console.log("config: " + config.appVersion);
	console.log("config: " + config.sessionSecret);


})

