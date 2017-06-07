'use strict';

const debug = require('debug')('NC:index')
	, config = require('./config/config.js')
	, express = require('express')
	, app = express()
	, engines = require('consolidate')
	, path = require('path')
	, url = require('url')
	;


app.engine('html', engines.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Application Middleware Functions go here
const requestTime = (req, res, next)=>{
	req.requestTime = Date.now();
	next();
};
const errorHandler = (req, res, next)=>{
	console.log("test this middleware errorHandler to see what it does.");
	next();
};


/*
app.get('/', (req, res, next)=> {
	debug("testing the debug handle");
	res.render('index', {message: "blasting our way through the galaxy."});
});
*/


app.use(requestTime);
app.use(errorHandler);

app.use('/', require('./index/routes.js')(config));
app.use('/auth', require('./auth/routes.js')(config));

app.use((req, res, next)=>{
	debug("default fallthrough 404 error middleware.");
	let message = "Sorry, but the requested URL doesn't work: ";
	res.status(404).render('error', {
		title: "Error Page",
		message: message, 
		resource: req.originalUrl, 
		requestedOn: req.requestTime
		});
});



app.listen(app.get('port'), function() {
  console.log(config.appName +" is running at localhost:" + app.get('port'))
	console.log("config: " + config.appVersion);
	console.log("config: " + config.sessionSecret);

})

