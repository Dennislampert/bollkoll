//"myAppName" controller.
app.controller("matchController", ["$scope","Match", function($scope,Match){

  // $scope.createMatch = function() {

  $scope.test = Match.get();

// };

  // $scope.test = Matches.getById("55815ab22a32d551d4c54bd7");
  // $scope.test = Matches.get({_id:"55c1f49292efcc982c00d36e"});

}]);