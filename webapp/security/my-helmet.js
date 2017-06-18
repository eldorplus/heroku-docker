'use strict';
const helmet = require('helmet')
	, expectCt = require('expect-ct')
	, uuidv4 = require('uuid/v4')
	, bodyParser = require('body-parser')
	, jsonParser = bodyParser.json({'type': ['json', 'application/csp-violation']})
	, debug = require('debug')('NC:my-helmet-middleware')
	;

/*
 * https://helmetjs.github.io/docs/csp/
 */
debug("Loading Helmet and it's header security features.");
debug(uuidv4());
module.exports = (app)=>{
	// create a globally available nonce for each request
	const setLocalsNonce = (req, res, next)=>{
		res.locals.nonce = uuidv4();
		next();
	};
	app.use(setLocalsNonce);
	app.use(jsonParser);
	app.post('/report-csp-violations', (req, res, next)=>{
		if (req.body){
			debug(`CSP Violation: ${req.body}`);
		} else {
			debug("CSP Violation: No data received.");
		}
		res.status(204).end();
	});
	app.use(helmet.contentSecurityPolicy({
		directives: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
		scriptSrc: ["'self'"],
		imgSrc: ["'self'", 's3.amazonaws.com', 'data:'],
		scriptSrc: ["'self'", "'unsafe-inline'",
		(req, res)=>{
			return `nonce-${res.locals.nonce}`;	
		}],
		//reportUri: '/report-csp-violations'
		reportUri: 'https://report-uri.io/account/activate/37504723bcd0dcf437cf8071032028f9'
		}
}));
	app.use(expectCt({
		enforce: true,
		maxAge: 365,
		reportUri: 'https://report-uri.io/account/activate/37504723bcd0dcf437cf8071032028f9'
	}));
	// Sets "X-DNS-Prefetch-Control: off".
	app.use(helmet.dnsPrefetchControl());

	// Sets "X-Frame-Options: SAMEORIGIN".
	app.use(helmet.frameguard({action: "sameorigin"}));

	// Hides "X-Powered-By header
	app.use(helmet.hidePoweredBy({setTo: "Boners and Strict Muscle Ups"}));

	// Sets the Public-Key-Pins headers
	let ninetyDaysInSeconds = 7776000;
	app.use(helmet.hpkp({
		maxAge: ninetyDaysInSeconds,
		sha256s: [
			'vwJXXkJJM2Qr8lcbdtOIG7vPM+SjefN3Ff6dkOp308s=',
			'/SrK/hjNEsXFDv9gjLX9LhGD41N9gsjwst3fnqeh3Eg=',
			'ZnvuvExX4YHAbfhiIlF3Susm1LJoQKR643yt8RU8p5U='
		],
		includeSubdomains: true,
		reportUri: 'ZnvuvExX4YHAbfhiIlF3Susm1LJoQKR643yt8RU8p5U='
	}));

return app;
};
