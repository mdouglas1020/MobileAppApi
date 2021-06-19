//NPM Module for MySQL Interactions
var mysql = require('mysql');

//Create connection variable that will be used throughout the
//api to talk to the database
var connection = mysql.createConnection({
  host: '54.244.76.150',
  user: 'app-user',
  password: 'P@ssword69',
  database: 'bakery'
});

//try a connection to the MySQL server and throw an Error
//if the connection fails
connection.connect(function(err) {
  if (err) throw err
  else console.log('Database Connection Successful!')
});
// connection.query('USE bakery');

//Returns the connection as a useable variable
module.exports = connection;
