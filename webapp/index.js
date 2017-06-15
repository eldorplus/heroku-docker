'use strict';

const debug = require('debug')('NC:index')
	, config = require('./config/config.js')
	, helmet = require('helmet')
	, express = require('express')
	, app = express()
	, engines = require('consolidate')
	, exphbs = require('express-handlebars')
	, path = require('path')
	, url = require('url')
	;

app.use(helmet());
//app.engine('html', engines.handlebars);
//app.set('view engine', 'html');
app.engine('html', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
//app.use('/.well-known', express.static(__dirname + '/.well-known'));

// Application Middleware Functions go here
const requestTime = (req, res, next)=>{
	req.requestTime = Date.now();
	next();
};
const logErrors = (err, req, res, next)=>{
	debug(err.stack);
	next(err);
};
const clientErrorHandler = (err, req, res, next)=>{
	debug(err.stack);
	if(req.xhr){
		res.status(500).json({
			status: 500,
			message: "internal server error",
			resource: req.originalUrl,
			requestedOn: req.requestTime,
			stack: err.stack
			});
	} else {
		next(err);
	}
};
const errorHandler = (err, req, res, next)=>{
	if(res.headersSent){
		return next(err);
	} else {
		res.status(500);
		res.render('error', {
			status: 500,
			message: "Internal server error.",
			resource: req.originalUrl,
			requestedOn: requestTime,
			stack: err.stack,
		});
	}
};

/*app.get('/', (req, res, next)=> {
	res.render('index', {message: "blasting our way through the galaxy."});
});*/


app.use(requestTime);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use('/', require('./index/routes.js')(config));
app.use('/auth', require('./auth/routes.js')(config));
app.use('/.well-known', require('./index/letsencrypt.js')(config));

app.use((req, res, next)=>{
	// HTTP 404; Not Found type err handler
	debug("default fallthrough 404 error middleware.");
	let message = "Sorry, but the requested resource is not found. ";
	res.status(404).render('error', {
		title: "Error Page",
		message: message, 
		resource: req.originalUrl, 
		requestedOn: req.requestTime
		});
});


app.listen(app.get('port'), function() {
  debug(config.appName +" is running at localhost:" + app.get('port'))
	debug("config: " + config.appVersion);
	debug("config: " + config.sessionSecret);
	console.log(process.env);
})

