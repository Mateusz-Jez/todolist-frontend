angular.module('ToDoListApp.controller', [])
.controller('ToDoListController', function($scope, $routeParams, todolistAPIservice) {
    $scope.tasks = [];

    todolistAPIservice.getTasks($routeParams.category).then(function (data) {
       $scope.tasks = data;
    });
}).
controller('AddTaskController', function($scope, todolistAPIservice) {
    $scope.addTask = function(){
        todolistAPIservice.addTask($scope.title, $scope.description, $scope.deadline);
    }
});