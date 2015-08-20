app.controller("registerController",
  ["$scope", "$http", "User", "$location", "NavTitleChange",
  function($scope, $http, User, $location, NavTitleChange) {
  NavTitleChange("Registrera");
  $scope.userInfo = {};
  $scope.register = function() {
    if ($scope.userInfo.password === $scope.userInfo.passwordCompare) {
      User.create($scope.userInfo, function(data) {
        console.log("rr", data);
        $location.url("/loggain");
      });
    }
  };
}]);