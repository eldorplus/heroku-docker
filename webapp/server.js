'use strict';

const debug = require('debug')('NC:index')
	, config = require('./config/config.js')
	//, helmet = require('helmet')
	, express = require('express')
	, app = express()
	, session = require('express-session')
	, RedisStore = require('connect-redis')(session)
	, myHelmet = require('./security/my-helmet.js')(app)
	, bodyParser = require('body-parser')
	, engines = require('consolidate')
	, moment = require('moment')
	, exphbs = require('express-handlebars')
	, path = require('path')
	, url = require('url')
	, helpers = require('./views/helpers/node-core-helpers.js')
	

app.set('trust proxy', true)
app.use(session({
	host: config.r.host,
	port: config.r.port
	secret: config.r.sessionSecret,
	store: new RedisStore,
	logErrors: (err)=>{
		const d = require('debug')('NC:RedisStore')
		d(`(${process.env.NODE_ENV}) ${err}`)
	}
	}))
app.use(bodyParser())
app.engine('html', exphbs({
	helpers: helpers,
	defaultLayout: "main", 
	partialsDir: "views/partials"}))

app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Application Middleware Functions go here
const requestTime = (req, res, next)=>{
	req.requestTime = Date.now()
	next()
}
const logErrors = (err, req, res, next)=>{
	debub("logErrors middleware called.")
	debug(err.stack)
	next(err)
}
const clientErrorHandler = (err, req, res, next)=>{
	debug('clientErrorHandler middleware')
	if(req.xhr){
		res.status(500).json({
			status: 500,
			message: "internal server error",
			resource: req.originalUrl,
			requestedOn: req.requestTime,
			stack: err.stack
			})
	} else {
		next(err)
	}
}
const errorHandler = (err, req, res, next)=>{
	debug('errorHandler middleware')
	if(res.headersSent){
		return next(err)
	} else {
		res.status(500);
		res.render('error.html', {
			status: 500,
			message: "Internal server error.",
			resource: req.originalUrl,
			requestedOn: requestTime,
			stack: err.stack,
		})
	}
}


app.use(requestTime)
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.use('/', require('./index/routes.js')(config))
app.use('/auth', require('./accounts/routes.js')(config))
app.use('/robots.txt', require('./index/robots.js')(config))
app.use('/sitemap.xml', require('./index/sitemap-xml.js')(app, config))
app.use('/.well-known', require('./index/letsencrypt.js')(config))

app.use((req, res, next)=>{
	// HTTP 404; Not Found type err handler
	debug("Default fall-through route handler; 404 error middleware.")
	let message = "Sorry, but the requested resource is not found. "
	res.status(404).render('error.html', {
		helpers: {},
		layout: "main",
		siteTitle: config.appName,
		title: "Error Page",
		message: message, 
		resource: req.originalUrl, 
		requestedOn: req.requestTime
		})
})


app.listen(app.get('port'), function() {
  debug(config.appName +" is running at localhost:" + app.get('port'))
	debug("config appVersion: " + config.appVersion)
	debug("config sessionSecret: " + config.sessionSecret)
	console.log(process.env)
})

