'use strict';
const router = require('express').Router()
	, debug = require('debug')('NC:robots.txt-router')
	;

debug("Loading the robot.txt router.");
module.exports = (config)=> {
	
	router.get('/', (req, res)=>{

		res.set('Content-Type', 'text/plain')
			.send(generateRobotsTxt(req, router))
			.end();
	});

	/*
	 * Think about adding meta tags direclty to HTML files 
	 * only for the sake of sematic completeness...
	 *
	 * <META NAME="ROBOTS" CONTENT="NOINDEX, FOLLOW">
	 * <META NAME="ROBOTS" CONTENT="INDEX, NOFOLLOW">
	 * <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
	 */

	const generateRobotsTxt = (req, router)=>{
		/* 
		* Eventually, this function will generate the robots.txt file
		* from the passed express router object.  But for now, just 
		* send a simple disallow all version.
		*/
		let protocol = req.protocol
			, siteName = req.hostname
			;

		return `Sitemap: ${protocol}://${siteName}/sitemap.xml
User-agent: Google
Disallow: 
User-agent: *
Disallow: /
`;
	};

	return router;
};
