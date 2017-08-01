'use strict'

const debug = require('debug')('NC:index')
const config = require('./config/config.js')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
// const engines = require('consolidate')
// const url = require('url')
const moment = require('moment')
const exphbs = require('express-handlebars')
const helpers = require('./views/helpers/node-core-helpers.js')
const db = require('./db/index.js')(config)

require('./security/my-helmet.js')(app)

app.use(cookieParser())
app.set('trust proxy', 1)
app.use(session({
  secret: config.r.sessionSecret,
  store: new RedisStore({
    host: config.r.host,
    port: config.r.port,
    // prefix: config.r.prefix,
    logErrors: (err) => {
      const d = require('debug')('NC:RedisStore')
      d(`(${process.env.NODE_ENV}) ${err}`)
    }
  }),
  resave: true,
  saveUninitialized: true,
  proxy: true,
  name: config.sessionName,
  unset: 'keep',
  cookie: {
    path: '/',
    httpOnly: false,
    secure: 'auto',
    domain: null,
    expires: null,
    maxAge: 60000,
    sameSite: 'strict'
  }
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.engine('html', exphbs({
  helpers: helpers,
  defaultLayout: 'main',
  partialsDir: 'views/partials'}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, '/public')))

// Application Middleware Functions go here
const requestTime = (req, res, next) => {
  let myMoment = moment().format()
  req.requestTime = myMoment
  next()
}
const logErrors = (err, req, res, next) => {
  debug('logErrors middleware called.')
  debug(err.stack)
  next(err)
}
const clientErrorHandler = (err, req, res, next) => {
  debug('clientErrorHandler middleware')
  if (req.xhr) {
    res.status(500).json({
      status: 500,
      message: 'internal server error',
      resource: req.originalUrl,
      requestedOn: req.requestTime,
      stack: err.stack
    })
  } else {
    next(err)
  }
}
const errorHandler = (err, req, res, next) => {
  debug('errorHandler middleware')
  if (res.headersSent) {
    return next(err)
  } else {
    res.status(500)
    res.render('error.html', {
      status: 500,
      message: 'Internal server error.',
      resource: req.originalUrl,
      requestedOn: requestTime,
      stack: err.stack
    })
  }
}

app.use(requestTime)
app.use(logErrors)

app.use('/', require('./index/routes.js')({config, db}))
app.use('/auth', require('./accounts/routes.js')({config, db}))
app.use('/robots.txt', require('./index/robots.js')(config, db))
app.use('/sitemap.xml', require('./index/sitemap-xml.js')({app, config, db}))
app.use('/.well-known', require('./index/letsencrypt.js')({config, db}))

app.use(clientErrorHandler)
app.use(errorHandler)
app.use((req, res, next) => {
  // HTTP 404; Not Found type err handler
  debug('Default fall-through route handler; 404 error middleware.')
  let message = 'Sorry, but the requested resource is not found. '
  res.status(404).render('error.html', {
    helpers: {},
    layout: 'main',
    siteTitle: config.appName,
    title: 'Error Page',
    message: message,
    resource: req.originalUrl,
    requestedOn: req.requestTime
  })
})

app.listen(app.get('port'), () => {
  debug(config.appName + ' is running at localhost:' + app.get('port'))
  debug('config appVersion: ' + config.appVersion)
  debug('config sessionSecret: ' + config.r.sessionSecret)
  console.info(process.env)
})
