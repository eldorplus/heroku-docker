'use strict';
const mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, debug = require('debug')("NC:mongoose")
	;

module.export = (c)=>{

	const uri = `mongodb://${c.m.username}:${c.m.password}@${c.m.host}:${c.m.port}/${c.m.db}`
		, options = {
				
		}
		;
		debug(`mongodb connection string: ${uri}`);
		mongoose.connect(uri, options);

};
