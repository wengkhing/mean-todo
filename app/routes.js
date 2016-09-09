
var Todo = require('./models/todo');

module.exports = function(app) {
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
  app.delete('/api/todos/:todo_id', function (req, res) {
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
};