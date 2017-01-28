var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions.
var hamburger = require("../models/burger.js");

// Create all the routes and set up logic within those routes where required.
router.get('/', function(request, response){
	hamburger.all(function(data){
		var burgerSources = [{source:'/img/giantburger.jpg', name:'giant burger'}, {source:'/img/healthierburger.jpg', name: 'healthier burger'}, {source:'/img/lettucebunburger.jpg', name: 'lettuce bun burger'}];
		//var burgerImageSelection = burgerSources[Math.floor(Math.random()*burgerSources.length)];
		var handlebarsObject = {
			burger: data,
			burgerImage: burgerSources[Math.floor(Math.random()*burgerSources.length)]
		};
		response.render('index', handlebarsObject);
	});
});

router.post('/', function(request, response){
	//enter the appropriate hamburgers table column names
	//enter the hamburger name provided from the input field, and set devoured to false
	//in index.handlebars, the hidden input for 'devoured' is value 0 for false...
	hamburger.create(['burger_name', 'devoured'],[request.body.burger_input, request.body.devoured], function(){
		response.redirect('/');
	});
});

router.put('/:id', function(request, response){
	var condition = 'id = ' + request.params.id;

	hamburger.update({devoured: request.body.devoured}, condition, function(){
		response.redirect('/');
	});
});


// Export routes for server.js to use.
module.exports = router;