var application = application.module('application', []);

function mainController ($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all the todos and show user
  $http.get('/api/todos')
  .success(function (data) {
    $scope.todos = data;
    console.log(data);
  }).error(function(data){
    console.log('Error: ' + data);
  });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http.post('/api/todos')
    .success(function (data) {
      // clear the form so user is ready to enter another
      $scope.formData = {};
      // assign todos with latest data
      $scope.todos = data;
      console.log(data);
    }).error(function(data) {
      console.log('Error: ' + data);
    });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos' + id)
    .success(function (data) {
      $scope.todos = data;
      console.log(data);
    }).error(function(data) {
      console.log('Error: ' + data);
    });
  };


}