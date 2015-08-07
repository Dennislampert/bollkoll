app.controller("registerController", ["$scope", "$http", "User", function($scope, $http, User) {
  
  $scope.userInfo = {};
  $scope.register = function() {
    
    User.create($scope.userInfo, function(data) {
      console.log("rr", data);
    });
  };
}]);