angular.module('ToDoListApp.controller', [])
.controller('ToDoListController', function($scope, $routeParams, todolistAPIservice) {
    $scope.tasks = [];
    $scope.selectedTasksId = [];
    $scope.notCompletedSelected = false;

    todolistAPIservice.getTasks($routeParams.category).then(function (data) {
       $scope.tasks = data;
    });

    $scope.selectTask = function (id) {
        var idInArray = $scope.selectedTasksId.indexOf(id)
        if(idInArray === -1) {
            $scope.selectedTasksId.push(id);
        }
        else {
            $scope.selectedTasksId.splice(idInArray, 1);
        }
        $scope.checkIfNotCompletedSelected();
    }

    $scope.deleteTasks = function () {
        todolistAPIservice.deleteTasks($scope.selectedTasksId);
    }

    $scope.checkIfNotCompletedSelected = function () {
        $scope.notCompletedSelected = false;
        angular.forEach($scope.tasks, function (value, key) {
            if($scope.selectedTasksId.indexOf(value.id) !== -1) {
                if(value.taskCategory !== 'COMPLETED') {
                    $scope.notCompletedSelected = true;
                }
            }
        });
    }

    $scope.markTasksAsCompleted = function () {
        todolistAPIservice.markTasksAsCompleted($scope.selectedTasksId);
    }

    $scope.editTask = function () {

    }
})
.controller('AddTaskController', function($scope, todolistAPIservice, $window) {
    $scope.checkDate = function () {
        if($scope.deadline <= new Date()) {
            $scope.error = "Please enter a future date!";
        }
        else {
            delete $scope.error;
            $scope.addTask();
        }
    }

    $scope.addTask = function (){
        todolistAPIservice.addTask($scope.title, $scope.description, $scope.deadline, $window);
    }
});