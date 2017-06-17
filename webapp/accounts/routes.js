'use strict';

const router = require('express').Router()
	//, config = require('../config/config.js')
	, debug = require('debug')('NC:auth-router')
	;

debug("loading the node-core authentication router.");
module.exports = (config)=> {
	
	return router;
};
