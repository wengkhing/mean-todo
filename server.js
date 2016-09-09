
// setup ==================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ============================================

// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://admin:admin123@olympia.modulusmongo.net:27017/uze8pYdu');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model ==============================================
var Todo = mongoose.model('Todo', {
    text : String
});

// routes ====================================================

// api -----------------
// get all todos
app.get('/api/todos', function (req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function (err, todos) {

    // if there is an error retrieving, send the error. 
    // nothing after res.send(err) will exec
    if (err)
      res.send(err)

    // return all todos in json format
    res.json(todos);
  });
});

// create todo and send back all todos after creaation
app.post('/api/todos', function (req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err)
      res.send(err)

    // get and return all todos after creation success
    Todo.find(function (err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// delete a todo by id
app.delete('/api/todos/:todo_api', function (req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err)
      res.send(err)

     // get and return all todos after creation success
    Todo.find(function (err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// send front end application to client on * access -------------------
app.get('*', function(req, res) {
  // load the single view file (angular will handle the page changes on the front-end)
  res.sendfile('./public/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");