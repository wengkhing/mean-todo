
// setup ==================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');                   // log requests to the console (express4)
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var database = require('./config/database');
var port = process.env.PORT || 8080;

// configuration ============================================

// connect to mongoDB database on modulus.io
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ====================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("Magic is happening on port " + port);