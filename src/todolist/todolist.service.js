angular.module('ToDoListApp.service', [])
.factory('todolistAPIservice', function($http, Category) {
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
                "taskCategory": Category.PENDING
            }
        }).then(function (){
            if(!alert('Successfully added new task!')){
                window.location.reload();
            }
        });
    }

    todolistAPI.deleteTasks = function (tasks) {
        return $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/task",
                data: JSON.stringify(tasks),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function () {
                    if(!alert('Selected tasks have been deleted!')){
                        window.location.reload();
                    }
                }
            });
    }

    todolistAPI.markTasksAsCompleted = function (tasks) {

        return $.ajax({
                type: "POST",
                url: "http://localhost:8080/task/complete",
                data: JSON.stringify(tasks),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function () {
                    window.location.reload();
                }
            });
    }

    todolistAPI.editTask = function (id, title, description, category, deadline) {
        return $http({
                    method: 'PUT',
                    url: "http://localhost:8080/task/" + id,
                    data: {
                        "id" : id,
                        "title": title,
                        "description": description,
                        "deadline": deadline,
                        "taskCategory": category
                    }
                }).then(function (){
                    window.location.reload();
                });
    }

    return todolistAPI;
});