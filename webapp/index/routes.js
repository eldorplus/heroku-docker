'use strict';

const router = require('express').Router()
	, debug = require('debug')('NC:index-router')
	;

debug("Loading the node-core index router.");
module.exports = (config)=> {

	router.get('/', (req, res, next)=>{
		res.render('index/index.html', {
			title: "Node Core App",
			message: "blastering our way through the galaxy."
		});
	});
	
	router.get('/about', (req, res, next)=>{
		res.render('index/about', {
			title: "About Page Title",
			message: "no messages to display",
			body: {
				h1_1: "What is the difference between iced coffee and cold brew coffee?",
				p1: "The English language is jam packed with synonyms, but \"cold brew\" and \"iced coffee\" don't qualify. Even the most dedicated coffee drinkers might not know the difference between the two, but there are certain characteristics of each. Before you reach for a coffee chilled to the perfect temperature this summer, review this quick breakdown of the key differences.",
				h3_1: "Iced Coffee",
				p2: "<p>This one is simple enough: Iced coffee is prepared when regularly brewed coffee is poured over ice. If you've ever tried to do this yourself, you\'ve probably discovered a few hacks that prevent your coffee from getting completely watered down the moment it hits ice. For starters, you could allow it to cool a little before dropping in ice cubes, as it reduces the amount of ice that melts into your coffee.</p><p>You could also reduce dilution by preparing coffee cubes, which we\'ve discussed at length. If you haven\'t made them yet, it\'s time to start. Simply pour some coffee into empty ice trays and store them in the freezer overnight. Use them in place of regular ice cubes, and you\'ll understand why we can\'t stop raving about them.</p><p>Iced coffee prepared this way is slightly more bitter than cold brew, and it\'s thinner in consistency because of the ice that\'s added. Even if you do choose to use coffee cubes, there\'s still some water that will be added to the drink.</p>",
				h3_2: "Cold Brew Coffee",
				p3: "<p>For those who are serious about avoiding diluted coffee, cold brew might be the best choice. Beware, though. This takes longer to prepare, as it doesn't use heat, but rather time, to extract all of the goodness that your coffee grounds have to offer.</p><p>Here's how it works: Medium coffee grounds are left to seep in room-temperature water for 12 hours or more. From there, the liquid is poured through a filter to remove the grounds, and then ice is added. The grounds are never exposed to heat, and the end result is thicker coffee that has double the amount of caffeine. Pro tip: Add some chocolate syrup to bring out the naturally sweet flavor and thick consistency that this method produces. You'll basically turn your regular morning brew into a tasty dessert that fuels your body with energy.</p>"
			}
		});
	});
	
	return router;
};
