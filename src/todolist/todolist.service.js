angular.module('ToDoListApp.service', [])
.factory('todolistAPIservice', function($http) {
    var todolistAPI = {};

    todolistAPI.getTasks = function (category) {

        return $http({
            method: 'GET',
            url: 'http://localhost:8080/task/' + category
        }).then(function (response){
            return response.data;
        });
    }

    todolistAPI.addTask = function (title, description, deadline, window) {

        return $http({
            method: 'POST',
            url: "http://localhost:8080/task",
            data: {
                "title": title,
                "description": description,
                "deadline": deadline,
                "taskCategory": "PENDING"
            }
        }).then(function (){
            if(!alert('Successfully added new task!')){
                window.location.reload();
            }
        });
    }

    todolistAPI.deleteTasks = function (tasks) {
        return $http({
                    method: 'DELETE',
                    url: "http://localhost:8080/task",
                    data : tasks
                }).then(function (){
                    if(!alert('Selected tasks have been deleted!')){
                    window.location.reload();
                    }
                });
    }

    todolistAPI.markTasksAsCompleted = function (tasks) {
            return $http({
                        method: 'POST',
                        url: "http://localhost:8080/task/complete",
                        data : tasks
                    }).then(function (){
                        window.location.reload();
                    });
        }

    return todolistAPI;
});