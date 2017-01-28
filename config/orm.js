// Import MySQL connection.
var connection = require("../config/connection.js");

// returns an array of ?, equal to the number of elements in the input array
function questionMarks(array) {
  var questionMarksArray = [];
  for (var i = 0; i < array.length; i++) {
    questionMarksArray.push('?');
  }
  return questionMarksArray.toString();
}

// Helper function for SQL syntax. (provided from 9mvc cats exercise)
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
  //selectAll function returns all data from the tableName
  selectAll: function(tableName, callback){
    var query = 'SELECT * FROM ' + tableName + ';';
    connection.query(query, function(error, response){
      if(error) throw error;
      console.log(response);
      callback(response);
    });
  },
  //insertOne inserts a new row of data
  insertOne: function(tableName, columnNamesArray, valuesArray, callback){
    var mySQLQuery = 'INSERT INTO ' + tableName + ' (' + columnNamesArray.toString() + ') ' + 'VALUES ('+ questionMarks(valuesArray) + ');';
    connection.query(mySQLQuery, valuesArray, function(error, response) {
      if (error) {
        throw error;
      }
      callback(response);
    });
  },
  //showSelected returns all data with particular criteria met
  showSelection: function(tableName, columnName, condition, callback){
    //connection.query('SELECT * FROM burgers WHERE devoured = false', function(err, response){
    var mySQLQuery = 'SELECT * FROM ' + tableName + ' WHERE ' + columnname + ' = ' + condition;
    connection.query(mySQLQuery, function(error, response){
      if(error) throw error;
      callback(response);
    });
  },
  //updateOne will change something for a particular row of table data
  //objectToChange example: {burger_name: 'healthy burger', devoured: false}
  updateOne: function(tableName, objectToChange, condition, callback){
    var mySQLQuery = 'UPDATE ' + tableName + ' SET '+ objToSql(objectToChange) + ' WHERE ' + condition;
    connection.query(mySQLQuery, function(error, response){
      if(error) throw error;
      callback(response);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
