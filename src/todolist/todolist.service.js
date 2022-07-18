(function() {
'use strict';

angular.module('ToDoListApp')
.service('ToDoListService', ToDoListService);

ToDoListService.$inject = ['$q']
function ToDoListService($q) {
    var service = this;

    var tasks = [];

    tasks.push({
        name: "Sugar",
        description: "Sugar used for baking delicious umm... baked goods."
      });
      tasks.push({
        name: "flour",
        description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
      });
      tasks.push({
        name: "Chocolate Chips",
        description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
      });
}

})();