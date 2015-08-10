app.controller("loginController", ["$http","$scope","$location","Login", function($http,$scope,$location,Login){

  $scope.userInfo = {};

  $scope.isLoggedIn = Login.user;
  $scope.login = function(){

    Login.login($scope.userInfo, function(data) {
      console.log("logged in: ", data);
      console.log("who's logged in?: ", Login.user);
    });

  };
  
}]);