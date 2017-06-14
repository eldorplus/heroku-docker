'use strict';
//module.exports = require('./' + (process.env.NODE_ENV || 'development') + '.json');
module.exports = {
	"appName": process.env.APP_NAME,
	"appVersion": process.env.APP_VERSION,
	"appPort": process.env.PORT,
	"dbURL": "mongodb://mongodb:27017/node_core",
	"sessionSecret": process.env.SESSION_SECRET,
	"fb": {
		"appId": false,
		"appSecret": false,
		"callbackURL": ""
	}
};
