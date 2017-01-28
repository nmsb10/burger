var express = require("express");

var router = express.Router();

//Import the model (burger.js) to use its database functions.
var hamburger = require("../models/burger.js");

// Create all the routes and set up logic within those routes where required.
router.get('/', function(request, response){
	hamburger.all(function(data){
		var handlebarsObject = {
			burger: data
		};
		response.render('index', handlebarsObject);
	});
});

router.post('/', function(request, response){
	//enter the appropriate hamburgers table column names
	//enter the hamburger name provided from the input field, and set devoured to false
	hamburger.create(['hamburger_name', 'devoured'],[request.body.burger_input, false], function(){
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