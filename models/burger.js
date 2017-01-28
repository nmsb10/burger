// Also inside burger.js, create the code that will call the ORM or query functions
//using burger specific input for the ORM or query functions.
// Export at the end of the burger.js file.

// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
	all: function(callback){
		orm.selectAll('burgers', function(response){
			callback(response);
		});
	},
	create: function(columns, values, callback){
		orm.insertOne('burgers', columns, values, function(response){
			callback(response);
		});
	},
	showDevoured: function(column, condition, callback){
		orm.showSelection('burgers', column, condition, function(response){
			callback(response);
		});
	},
	update: function(changeObject, condition, callback){
		orm.updateOne('burgers', changeObject, condition, function(response){
			callback(response);
		});
	}
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
