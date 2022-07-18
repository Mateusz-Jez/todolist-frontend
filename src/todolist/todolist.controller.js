(function () {
'use strict';

angular.module('ToDoListApp')
.controller('ToDoListController', ToDoListController);

ToDoListController.$inject = ['tasks'];
function ToDoListController(tasks) {
    var mainList = this;
    mainList.tasks = tasks;
}

})();