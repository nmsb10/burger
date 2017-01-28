// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
//var path = require('path');
var methodOverride = require('method-override');

// Sets up the Express App
//tells node to use an "express" server
var app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: false }));

//this means all static file references are assumed to start from the assets folder
//eg within an html file, refer to the static css file
// app.use(express.static(path.join(__dirname, '/public/assets')));
//app.use(express.static(__dirname +'/public/assets'));
//process.cwd() represents the directory in which server.js is located
app.use(express.static(process.cwd() +'/public/assets'));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//set express handlebars:
var exphbs = require('express-handlebars');

//create express handlebars engine:
//give internal name of hbs
//make default layout main.handlebars
// app.engine('hbs', exphbs({ defaultLayout: "main" , layoutsDir: __dirname + '/views/layouts'}));
//NOTE: name of the engine MUST match the file extension (in this case, we named the handlebars files YYY.handlebars)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
//now set the engine you use to the 'hbs' engine you just created above
//app.set("view engine", 'hbs');
app.set("view engine", 'handlebars');
//now the handlebars engine will use the main.handlebars as the default html page,
//and use the index.handlebars content to replace {{{ body }}}


//ROUTER
// The below code points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs."
//remember, the path starts from the location of the server.js file
//require('./app/routing/apiRoutes.js')(app);
//require('./app/routing/htmlRoutes.js')(app);
var routes = require('./controllers/burgers_controller.js');

//here, if URL is /, use routes as specified in burgers_controller.js
app.use('/', routes);

// Starts the server to begin listening for requests
app.listen(PORT);