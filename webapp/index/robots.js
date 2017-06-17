'use strict';
const router = require('express').Router()
	, debug = require('debug')('NC:robots.txt-router')
	;

debug("Loading the robot.txt router.");
module.exports = (config)=> {
	
	router.get('/', (req, res)=>{

		res.set('Content-Type', 'text/plain')
			.send(generateRobotsTxt(router))
			.end();
	});


	const generateRobotsTxt = (router)=>{
		/* 
		* Eventually, this function will generate the robots.txt file
		* from the passed express router object.  But for now, just 
		* send a simple disallow all version.
		*/
		return `
# go away (at least for now)
User-agent: *
Disallow: /
`;
	};

	return router;
};


