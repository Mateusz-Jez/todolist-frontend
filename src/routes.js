(function () {
'use strict';

angular.module('ToDoListApp')
.config(RoutesConfig)

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'src/todolist/templates/tasklist.template.html'
      })

    .state('add', {
        url: '/add',
        templateUrl: 'src/todolist/templates/addtask.template.html'
    });
}

})();