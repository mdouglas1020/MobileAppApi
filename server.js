//Wholesome Sweets Bakery API
//Created By: Hayden Haddock, Michael Douglass, Devin Cargill, David Auger
//Port number for address
var port = 3000;

//NPM Modules
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

// this allows cross origin access (you need this for mobile apps)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

//Creating an instance of of the Express server
var app = express();

//Configure body-parser to use URLENCODED and json
//This is basic setup stuff for the server
app.use(allowCrossDomain);//uses the above cors function
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


//Tell the express server which router file to look at
app.use('/user', require('./app/user.js'));
app.use('/product', require('./app/product.js'));
app.use('/order', require('./app/order.js'));

//Tell the express server to listen for traffic on the above port
app.listen(port);
console.log("The real programmers are gossiping about you on port " + port);
