'use strict'
const helmet = require('helmet')
const expectCt = require('expect-ct')
const uuidv4 = require('uuid/v4')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json({'type': ['json', 'application/csp-violation']})
const debug = require('debug')('NC:my-helmet-middleware')

/*
 * https://helmetjs.github.io/docs/csp/
 */
debug("Loading Helmet and it's header security features.")
debug(uuidv4())
module.exports = (app) => {
  // create a globally available nonce for each request
  const setLocalsNonce = (req, res, next) => {
    res.locals.nonce = uuidv4()
    next()
  }
  app.use(setLocalsNonce)
  app.use(jsonParser)
  app.post('/report-csp-violations', (req, res, next) => {
    if (req.body) {
      debug(`CSP Violation: ${req.body}`)
    } else {
      debug(`CSP Violation: No data received.`)
    }
    res.status(204).end()
  })
  app.post('/report-hpkp-violations', (req, res, next) => {
    if (req.body) {
      debug(`HPKP Violation: ${req.body}`)
    } else {
      debug(`HPKP Violation: No data received.`)
    }
    res.status(204).end()
  })

  // Use https://report-uri.io/ for reporting and tracking header violations.
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com', "'unsafe-inline'"],
      imgSrc: ["'self'", 's3.amazonaws.com', 'data:'],
      scriptSrc: ["'self'", "'unsafe-inline'",
        (req, res) => {
          return `nonce-${res.locals.nonce}`
        }],
      // reportUri: '/report-csp-violations'
      reportUri: 'https://mattduffy.report-uri.io/r/default/csp/enforce'
    }
  }))

  // Sets Expect-CT: max-age=7776000
  let ninetyDaysInSeconds = 7776000
  app.use(expectCt({
    enforce: true,
    maxAge: ninetyDaysInSeconds,
    reportUri: 'https://mattduffy.report-uri.io/r/default/ct/enforce'
  }))

  // Sets "X-DNS-Prefetch-Control: off".
  app.use(helmet.dnsPrefetchControl({allow: false}))

  // Sets "X-Frame-Options: SAMEORIGIN".
  app.use(helmet.frameguard({action: 'sameorigin'}))

  // Hides "X-Powered-By header
  app.use(helmet.hidePoweredBy({setTo: 'Boners and Strict Handstand Push-ups'}))

  // Sets the Public-Key-Pins header.
  app.use(helmet.hpkp({
    maxAge: ninetyDaysInSeconds,
    sha256s: [
      'vwJXXkJJM2Qr8lcbdtOIG7vPM+SjefN3Ff6dkOp308s=',
      '/SrK/hjNEsXFDv9gjLX9LhGD41N9gsjwst3fnqeh3Eg=',
      'ZnvuvExX4YHAbfhiIlF3Susm1LJoQKR643yt8RU8p5U='
    ],
    includeSubdomains: true,
    // reportUri: '/report-hpkp-violations'
    reportUri: 'https://mattduffy.report-uri.io/r/default/hpkp/enforce'
  }))

  // Sets the Strict-Transport-Security header.
  // Google's HSTS Preload https://hstspreload.org
  let eightteenWeeksInSeconds = 10886400
  app.use(helmet.hsts({
    maxAge: eightteenWeeksInSeconds,
    includeSubdomains: true,
    force: true,
    preload: true
  }))

  // Sets "X-Download-Options: noopen".
  app.use(helmet.ieNoOpen({allow: false}))

  // Sets headers for Cache-Control, Surrogate-Control, Pragma, and Expires.
  // Enabled during development, disabled in production
  if (process.env.NODE_ENV === 'development') {
    app.use(helmet.noCache())
  }

  // Sets "X-Content-Type-Options: nosniff".
  app.use(helmet.noSniff())

  // Sets "Referrer-Policy: no-referrer".
  app.use(helmet.referrerPolicy({ policy: 'origin' }))

  // Sets "X-XSS-Protection: 1; mode=block".
  app.use(helmet.xssFilter())

  return app
}
