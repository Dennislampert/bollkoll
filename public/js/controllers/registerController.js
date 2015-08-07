app.controller("registerController", ["$scope", "$http", "User", function($scope, $http, User) {
  $scope.register = function() {
    $scope.userInfo = {};
    if ($scope.userInfo.password === $scope.userInfo.passwordCompare) {
      User.create({
        username: $scope.userInfo.username,
        password: $scope.userInfo.password,
        fname: $scope.userInfo.fname,
        lname: $scope.userInfo.lname,
        email: $scope.userInfo.email,
        picturePath: "/uploads/images/default.jpeg"
      });
    } else {
      return false;
    }
  };
}]);