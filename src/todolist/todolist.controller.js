angular.module('ToDoListApp.controller', [])
.controller('ToDoListController', function($scope, $routeParams, todolistAPIservice, $uibModal, $log, Category) {
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
                if(value.taskCategory !== Category.COMPLETED) {
                    $scope.notCompletedSelected = true;
                }
            }
        });
    }

    $scope.markTasksAsCompleted = function () {
        todolistAPIservice.markTasksAsCompleted($scope.selectedTasksId);
    }

    $scope.findTaskById = function (id) {
            for(var i=0; i<$scope.tasks.length; i++){
                if($scope.tasks[i].id == id) return $scope.tasks[i];
            }
    }

    $scope.editTaskData;

    $scope.editTask = function(id) {
        $scope.editTaskData = $scope.findTaskById(id);
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'src/todolist/templates/edittask.template.html',
          controller: 'ModalInstanceCtrl',
          size: 'lg',
          resolve: {
            editTaskData: function() {
              return $scope.editTaskData;
            }
          }
        });

        modalInstance.result.then(function(selectedItem) {
              $scope.selected = selectedItem;
            }, function() {

            });
    };
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
})
.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, editTaskData, todolistAPIservice, Category) {
  $scope.editTitle = editTaskData.title;
  $scope.editDescription = editTaskData.description;
  $scope.editCategory = editTaskData.taskCategory;
  $scope.editDeadline = new Date(editTaskData.deadline);

  $scope.confirm = function() {

    todolistAPIservice.editTask(editTaskData.id, $scope.editTitle, $scope.editDescription, $scope.editCategory, $scope.editDeadline);
  };

  $scope.complete = function () {
    $scope.editCategory = Category.COMPLETED;
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});;