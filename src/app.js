angular.module('ToDoListApp', [
    'ToDoListApp.service',
    'ToDoListApp.controller',
    'ToDoListApp.directive',
    'ngRoute',
    'ui.bootstrap'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when("/home/:category", {templateUrl: "src/todolist/templates/tasklist.template.html", controller: "ToDoListController"})
    .when("/add", {templateUrl: "src/todolist/templates/addtask.template.html", controller: "AddTaskController"})
    .otherwise({redirectTo: '/home/ '});
}]);