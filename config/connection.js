// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,//the port
  user: 'root',//your username
  password: 'mG7xoj44S8f0mv3IC;',
  database: 'burgers_db'
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;