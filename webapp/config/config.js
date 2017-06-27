'use strict';
//module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json')
module.exports = {
	"appName": process.env.APP_NAME,
	"appVersion": process.env.APP_VERSION,
	"appPort": process.env.PORT,
	"dbURL": "mongodb://mongodb:27017/node_core",
	"r": {
		"host": process.env.REDIS_HOST,
		"port": process.env.REDIS_PORT,
		"prefix": process.env.REDIS_PREFIX,,
		"sessionSecret": process.env.REDIS_SESSION_SECRET
	},
	"m": {
		"username": process.env.MONGO_USERNAME || null,
		"password": process.env.MONGO_PASSWORD || null,
		"host": process.env.MONGO_HOST,
		"port": process.env.MONGO_PORT,
		"db": process.env.MONGO_DB
	},
	"fb": {
		"appId": false,
		"appSecret": false,
		"callbackURL": ""
	}
}
