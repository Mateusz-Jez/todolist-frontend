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

    todolistAPI.addTask = function (title, description, deadline) {

        return $http({
            method: 'POST',
            url: "http://localhost:8080/task",
            data: {
                "title": title,
                "description": description,
                "deadline": deadline,
                "taskCategory": "PENDING"
            }
        });
    }

    return todolistAPI;
});