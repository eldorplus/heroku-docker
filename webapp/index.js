'use strict';

const express = require('express');
const app = express();
const config = require('./config/config.js');
const path = require('path');

var engines = require('consolidate');

app.engine('html', engines.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res, next) {
	console.log(process.env);
  //res.send('Hello World! Hey girl, let\'s fingerbang!')
	res.render('index', {message: "finger blasting our way through the galaxy."});
})

app.use(function(req, res){
	console.log(req.originalUrl);
	var message = "Sorry, but the requested URL doesn't work: " + res.originalUrl;
	res.status(404).render('404', {message: message});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
	console.log("FINGER: " + process.env.FINGER);
	console.log("config: " + config.appName);
	console.log("config: " + config.appVersion);
	console.log("config: " + config.sessionSecret);


})

